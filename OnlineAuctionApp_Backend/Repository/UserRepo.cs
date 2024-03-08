using System;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Repository.Interfaces;

namespace OnlineAuctionApp.Repository
{
    public class UserRepo : IUser
    {
        private readonly string _connectionString = "Data Source=APINP-ELPT9P8ER\\SQLEXPRESS;Initial Catalog=Auction;User ID=tap2023;Password=tap2023;Encrypt=False";

        private string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public async Task<Users> RegisterUserAsync(Users user)
        {
            user.PasswordHash = HashPassword(user.PasswordHash); // Hash the password before storing it

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("INSERT INTO Users (Username, Email, PasswordHash) VALUES (@Username, @Email, @PasswordHash); SELECT SCOPE_IDENTITY();", connection))
                {
                    command.Parameters.AddWithValue("@Username", user.Username);
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.Parameters.AddWithValue("@PasswordHash", user.PasswordHash);

                    var userId = Convert.ToInt32(await command.ExecuteScalarAsync());
                    user.UserID = userId;
                }
            }

            return user;
        }

        public async Task<Users> AuthenticateUserAsync(LogIn loginModel)
        {
            Users user = null;

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    using (var command = new SqlCommand("SELECT * FROM Users WHERE Email = @Email", connection))
                    {
                        command.Parameters.AddWithValue("@Email", loginModel.Email);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.Read())
                            {
                                var storedHash = reader["PasswordHash"].ToString();
                                if (storedHash == HashPassword(loginModel.Password))
                                {
                                    // User authenticated successfully
                                    user = new Users
                                    {
                                        UserID = Convert.ToInt32(reader["UserID"]),
                                        Username = reader["Username"].ToString(),
                                        Email = reader["Email"].ToString(),
                                        PasswordHash = storedHash // Store the hashed password
                                    };
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as appropriate for your application
                Console.WriteLine(ex.Message);
            }

            return user; // Return the user object if authentication is successful, or null if it fails
        }

        public async Task<Users> GetUserByIdAsync(int userId)
        {
            Users user = null;

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("SELECT * FROM Users WHERE UserID = @UserID", connection))
                {
                    command.Parameters.AddWithValue("@UserID", userId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            user = new Users
                            {
                                UserID = Convert.ToInt32(reader["UserID"]),
                                Username = reader["Username"].ToString(),
                                Email = reader["Email"].ToString(),
                                PasswordHash = reader["PasswordHash"].ToString() // Store the hashed password
                            };
                        }
                    }
                }
            }

            return user;
        }

        public async Task UpdateUserAsync(Users user)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("UPDATE Users SET Username = @Username, Email = @Email, PasswordHash = @PasswordHash WHERE UserID = @UserID", connection))
                {
                    command.Parameters.AddWithValue("@UserID", user.UserID);
                    command.Parameters.AddWithValue("@Username", user.Username);
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.Parameters.AddWithValue("@PasswordHash", user.PasswordHash); // Consider hashing the password before storing it

                    await command.ExecuteNonQueryAsync();
                }
            }
        }



        public async Task<IEnumerable<Users>> GetAllUsersAsync()
        {
            List<Users> users = new List<Users>();

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("SELECT * FROM Users", connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new Users
                            {
                                UserID = Convert.ToInt32(reader["UserID"]),
                                Username = reader["Username"].ToString(),
                                Email = reader["Email"].ToString(),
                                PasswordHash = reader["PasswordHash"].ToString() 
                            };

                            users.Add(user);
                        }
                    }
                }
            }

            return users;
        }


        public async Task<Admins> AuthenticateAdminAsync(Admins admin)
        {
            Admins authenticatedAdmin = null;

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    using (var command = new SqlCommand("SELECT * FROM Admins WHERE Email = @Email", connection))
                    {
                        command.Parameters.AddWithValue("@Email", admin.Email);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.Read())
                            {
                                var storedPassword = reader["Password"].ToString();

                                // Directly compare the passwords
                                if (storedPassword == admin.Password)
                                {
                                    authenticatedAdmin = new Admins
                                    {
                                        AdminID = Convert.ToInt32(reader["AdminID"]),
                                        AdminName = reader["AdminName"].ToString(),
                                        Email = reader["Email"].ToString(),
                                        Password = storedPassword // This should not be stored in plain text
                                    };
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as appropriate for your application
                Console.WriteLine(ex.Message);
            }

            return authenticatedAdmin; // Return the admin object if authentication is successful, or null if it fails
        }

        public async Task DeleteUserAsync(int userId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("DELETE FROM Users WHERE UserID = @UserID", connection))
                {
                    command.Parameters.AddWithValue("@UserID", userId);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}
