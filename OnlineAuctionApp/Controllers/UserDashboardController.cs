using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Services.Interfaces;

namespace OnlineAuctionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDashboardsController : ControllerBase
    {
        private readonly IUserDashboardService _userDashboardService;

        public UserDashboardsController(IUserDashboardService userDashboardService)
        {
            _userDashboardService = userDashboardService;
        }

        // GET: api/UserDashboards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDashboard>>> GetUserDashboards()
        {
            var userDashboards = await _userDashboardService.GetAllUserDashboardsAsync();
            return Ok(userDashboards);
        }

        // GET: api/UserDashboards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDashboard>> GetUserDashboard(int id)
        {
            var userDashboard = await _userDashboardService.GetUserDashboardByIdAsync(id);

            if (userDashboard == null)
            {
                return NotFound();
            }

            return userDashboard;
        }

        // POST: api/UserDashboards
        [HttpPost]
        public async Task<ActionResult<UserDashboard>> AddUserDashboard(UserDashboard userDashboard)
        {
            var createdUserDashboard = await _userDashboardService.AddUserDashboardAsync(userDashboard);
            return CreatedAtAction(nameof(GetUserDashboard), new { id = createdUserDashboard.DashboardID }, createdUserDashboard);
        }

        // PUT: api/UserDashboards/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserDashboard(int id, UserDashboard userDashboard)
        {
            if (id != userDashboard.DashboardID)
            {
                return BadRequest();
            }

            await _userDashboardService.UpdateUserDashboardAsync(userDashboard);

            return NoContent();
        }

        // DELETE: api/UserDashboards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserDashboard(int id)
        {
            await _userDashboardService.DeleteUserDashboardAsync(id);
            return NoContent();
        }
    }
}
