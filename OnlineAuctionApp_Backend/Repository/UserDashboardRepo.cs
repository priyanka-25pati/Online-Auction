using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Repository.Interfaces;

namespace OnlineAuctionApp.Repository
{
    public class UserDashboardRepo : IUserDashboard
    {
        private readonly string _connectionString = "Data Source=APINP-ELPT9P8ER\\SQLEXPRESS;Initial Catalog=Auction;User ID=tap2023;Password=tap2023;Encrypt=False";

        public async Task<IEnumerable<UserDashboard>> GetAllUserDashboardsAsync()
        {
            var userDashboards = new List<UserDashboard>();
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("SELECT * FROM UserDashboard", connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            userDashboards.Add(new UserDashboard
                            {
                                DashboardID = reader.GetInt32(reader.GetOrdinal("DashboardID")),
                                UserID = reader.GetInt32(reader.GetOrdinal("UserID")),
                                WatchedItems = reader.IsDBNull(reader.GetOrdinal("WatchedItems")) ? null : reader.GetString(reader.GetOrdinal("WatchedItems")),
                                Bids = reader.IsDBNull(reader.GetOrdinal("Bids")) ? null : reader.GetString(reader.GetOrdinal("Bids")),
                                PurchasedItems = reader.IsDBNull(reader.GetOrdinal("PurchasedItems")) ? null : reader.GetString(reader.GetOrdinal("PurchasedItems")),
                                SellingActivities = reader.IsDBNull(reader.GetOrdinal("SellingActivities")) ? null : reader.GetString(reader.GetOrdinal("SellingActivities"))
                            });
                        }
                    }
                }
            }
            return userDashboards;
        }

        public async Task<UserDashboard> GetUserDashboardByIdAsync(int dashboardId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("SELECT * FROM UserDashboard WHERE DashboardID = @DashboardID", connection))
                {
                    command.Parameters.AddWithValue("@DashboardID", dashboardId);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return new UserDashboard
                            {
                                DashboardID = reader.GetInt32(reader.GetOrdinal("DashboardID")),
                                UserID = reader.GetInt32(reader.GetOrdinal("UserID")),
                                WatchedItems = reader.IsDBNull(reader.GetOrdinal("WatchedItems")) ? null : reader.GetString(reader.GetOrdinal("WatchedItems")),
                                Bids = reader.IsDBNull(reader.GetOrdinal("Bids")) ? null : reader.GetString(reader.GetOrdinal("Bids")),
                                PurchasedItems = reader.IsDBNull(reader.GetOrdinal("PurchasedItems")) ? null : reader.GetString(reader.GetOrdinal("PurchasedItems")),
                                SellingActivities = reader.IsDBNull(reader.GetOrdinal("SellingActivities")) ? null : reader.GetString(reader.GetOrdinal("SellingActivities"))
                            };
                        }
                    }
                }
            }
            return null; // Return null if no dashboard is found
        }

        public async Task<UserDashboard> AddUserDashboardAsync(UserDashboard userDashboard)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("INSERT INTO UserDashboard (UserID, WatchedItems, Bids, PurchasedItems, SellingActivities) VALUES (@UserID, @WatchedItems, @Bids, @PurchasedItems, @SellingActivities); SELECT SCOPE_IDENTITY()", connection))
                {
                    command.Parameters.AddWithValue("@UserID", userDashboard.UserID);
                    command.Parameters.AddWithValue("@WatchedItems", userDashboard.WatchedItems ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Bids", userDashboard.Bids ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@PurchasedItems", userDashboard.PurchasedItems ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@SellingActivities", userDashboard.SellingActivities ?? (object)DBNull.Value);

                    var dashboardId = Convert.ToInt32(await command.ExecuteScalarAsync());
                    userDashboard.DashboardID = dashboardId;
                }
            }
            return userDashboard;
        }

        public async Task<UserDashboard> UpdateUserDashboardAsync(UserDashboard userDashboard)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("UPDATE UserDashboard SET UserID = @UserID, WatchedItems = @WatchedItems, Bids = @Bids, PurchasedItems = @PurchasedItems, SellingActivities = @SellingActivities WHERE DashboardID = @DashboardID", connection))
                {
                    command.Parameters.AddWithValue("@UserID", userDashboard.UserID);
                    command.Parameters.AddWithValue("@WatchedItems", userDashboard.WatchedItems ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Bids", userDashboard.Bids ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@PurchasedItems", userDashboard.PurchasedItems ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@SellingActivities", userDashboard.SellingActivities ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@DashboardID", userDashboard.DashboardID);

                    await command.ExecuteNonQueryAsync();
                }
            }
            return userDashboard;
        }

        public async Task DeleteUserDashboardAsync(int dashboardId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("DELETE FROM UserDashboard WHERE DashboardID = @DashboardID", connection))
                {
                    command.Parameters.AddWithValue("@DashboardID", dashboardId);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}
