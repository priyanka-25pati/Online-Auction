using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Services.Interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OnlineAuctionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost]
        public async Task<ActionResult<object>> RegisterUser(Users user)
        {
            var registeredUser = await _userService.RegisterUserAsync(user);
            if (registeredUser == null)
            {
                return BadRequest("User registration failed.");
            }

            // Generate JWT token for the registered user
            var token = GenerateJwtToken(registeredUser);

            // Create the response object as an anonymous object
            var response = new
            {
                User = registeredUser,
                Token = token
            };

            return CreatedAtAction(nameof(GetUserById), new { id = registeredUser.UserID }, response);
        }




        [HttpPost("authenticate")]
        public async Task<ActionResult> Authenticate([FromBody] LogIn loginModel)
        {
            // Attempt user authentication first
            var authenticatedUser = await _userService.AuthenticateUserAsync(loginModel);
            if (authenticatedUser != null)
            {
                // Generate JWT token for the authenticated user
                var token = GenerateJwtToken(authenticatedUser);

                // Create the response object as an anonymous object
                var response = new
                {
                    User = authenticatedUser,
                    Token = token
                };

                return Ok(response);
            }

            // If user authentication fails, attempt admin authentication
            var authenticatedAdmin = await _userService.AuthenticateAdminAsync(new Admins
            {
                Email = loginModel.Email,
                Password = loginModel.Password
            });

            if (authenticatedAdmin != null)
            {
                // Generate JWT token for the authenticated admin
                var token = GenerateJwtToken(authenticatedAdmin);

                // Create the response object as an anonymous object
                var response = new
                {
                    Admin = authenticatedAdmin,
                    Token = token
                };

                return Ok(response);
            }

            // If both authentication attempts fail, return an Unauthorized response
            return Unauthorized(new { message = "Invalid credentials." });
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, Users user)
        {
            if (id != user.UserID)
            {
                return BadRequest();
            }

            await _userService.UpdateUserAsync(user);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserAsync(id);

            return NoContent();
        }


        // Dummy endpoint to generate a token for a hardcoded user
        [HttpGet("generate-token")]
        public ActionResult<string> GenerateDemoToken()
        {
            // Create a default user for demonstration purposes
            var defaultUser = new Users
            {
                UserID = 1, // Example ID
                Username = "DemoUser",
                Email = "demo@example.com"
            };

            // Generate JWT token for the default user
            var token = GenerateJwtToken(defaultUser);

            // Return the token in the response body
            return Ok(token);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            if (users == null || !users.Any())
            {
                return NotFound("No users found.");
            }
            return Ok(users);
        }



        private string GenerateJwtToken(object userOrAdmin)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            // Consider storing the security key securely, e.g., in a configuration file or environment variable
            var key = Encoding.ASCII.GetBytes("this is my security key for generating Jwt token for myapplication"); // Your security key
            var claims = new List<Claim>();

            if (userOrAdmin is Users user)
            {
                if (user.Username == null || user.Email == null)
                {
                    throw new ArgumentNullException(user.Username == null ? nameof(user.Username) : nameof(user.Email), "Username and Email cannot be null.");
                }
                claims.Add(new Claim(ClaimTypes.Name, user.Username));
                claims.Add(new Claim(ClaimTypes.Email, user.Email));
                // Add other claims as needed for Users
            }
            else if (userOrAdmin is Admins admin)
            {
                if (admin.AdminName == null || admin.Email == null)
                {
                    throw new ArgumentNullException(admin.AdminName == null ? nameof(admin.AdminName) : nameof(admin.Email), "AdminName and Email cannot be null.");
                }
                claims.Add(new Claim(ClaimTypes.Name, admin.AdminName)); // Assuming Admins has a property AdminName
                claims.Add(new Claim(ClaimTypes.Email, admin.Email)); // Assuming Admins has an Email property
                                                                      // Add other claims as needed for Admins
            }
            else
            {
                throw new ArgumentException("userOrAdmin must be of type Users or Admins.", nameof(userOrAdmin));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                // Consider making the token expiration time, issuer, and audience configurable
                Expires = DateTime.UtcNow.AddDays(7), // Token expiration time
                Issuer = "my issuer", // Your issuer
                Audience = "my audience", // Your audience
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }




    }
}
