using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Repository.Interfaces;

namespace OnlineAuctionApp.Repository
{
    public class ItemRepo : IItemRepository
    {
        private readonly string _connectionString = "Data Source=APINP-ELPT9P8ER\\SQLEXPRESS;Initial Catalog=Auction;User ID=tap2023;Password=tap2023;Encrypt=False";

        public async Task<IEnumerable<Items>> GetItems()
        {
            var items = new List<Items>();
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("SELECT * FROM Items", connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var item = new Items
                            {
                                ItemID = reader.GetInt32(reader.GetOrdinal("ItemID")),
                                SellerID = reader.GetInt32(reader.GetOrdinal("SellerID")),
                                CategoryID = reader.GetInt32(reader.GetOrdinal("CategoryID")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString(reader.GetOrdinal("Description")),
                                StartingBid = reader.GetDecimal(reader.GetOrdinal("StartingBid")),
                                ReservePrice = reader.IsDBNull(reader.GetOrdinal("ReservePrice")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("ReservePrice")),
                                AuctionDuration = reader.GetInt32(reader.GetOrdinal("AuctionDuration")),
                                StartTime = reader.GetDateTime(reader.GetOrdinal("StartTime")),
                                EndTime = reader.GetDateTime(reader.GetOrdinal("EndTime")),
                                Status = reader.GetString(reader.GetOrdinal("Status"))
                            };
                            items.Add(item);
                        }
                    }
                }
            }
            return items;
        }

        public async Task<Items> GetItem(int id)
        {
            Items item = null;
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("SELECT * FROM Items WHERE ItemID = @Id", connection))
                {
                    command.Parameters.AddWithValue("@Id", id);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            item = new Items
                            {
                                ItemID = reader.GetInt32(reader.GetOrdinal("ItemID")),
                                SellerID = reader.GetInt32(reader.GetOrdinal("SellerID")),
                                CategoryID = reader.GetInt32(reader.GetOrdinal("CategoryID")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString(reader.GetOrdinal("Description")),
                                StartingBid = reader.GetDecimal(reader.GetOrdinal("StartingBid")),
                                ReservePrice = reader.IsDBNull(reader.GetOrdinal("ReservePrice")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("ReservePrice")),
                                AuctionDuration = reader.GetInt32(reader.GetOrdinal("AuctionDuration")),
                                StartTime = reader.GetDateTime(reader.GetOrdinal("StartTime")),
                                EndTime = reader.GetDateTime(reader.GetOrdinal("EndTime")),
                                Status = reader.GetString(reader.GetOrdinal("Status"))
                            };
                        }
                    }
                }
            }
            return item;
        }

        public async Task AddItem(Items item)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("INSERT INTO Items (SellerID, CategoryID, Title, Description, StartingBid, ReservePrice, AuctionDuration, StartTime, EndTime, Status) VALUES (@SellerID, @CategoryID, @Title, @Description, @StartingBid, @ReservePrice, @AuctionDuration, @StartTime, @EndTime, @Status)", connection))
                {
                    command.Parameters.AddWithValue("@SellerID", item.SellerID);
                    command.Parameters.AddWithValue("@CategoryID", item.CategoryID);
                    command.Parameters.AddWithValue("@Title", item.Title);
                    command.Parameters.AddWithValue("@Description", (object)item.Description ?? DBNull.Value);
                    command.Parameters.AddWithValue("@StartingBid", item.StartingBid);
                    command.Parameters.AddWithValue("@ReservePrice", (object)item.ReservePrice ?? DBNull.Value);
                    command.Parameters.AddWithValue("@AuctionDuration", item.AuctionDuration);
                    command.Parameters.AddWithValue("@StartTime", item.StartTime.ToString("yyyy-MM-dd HH:mm:ss"));
                    command.Parameters.AddWithValue("@EndTime", item.EndTime.ToString("yyyy-MM-dd HH:mm:ss"));
                    command.Parameters.AddWithValue("@Status", item.Status);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task UpdateItem(Items item)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("UPDATE Items SET SellerID = @SellerID, CategoryID = @CategoryID, Title = @Title, Description = @Description, StartingBid = @StartingBid, ReservePrice = @ReservePrice, AuctionDuration = @AuctionDuration, StartTime = @StartTime, EndTime = @EndTime, Status = @Status WHERE ItemID = @ItemID", connection))
                {
                    command.Parameters.AddWithValue("@SellerID", item.SellerID);
                    command.Parameters.AddWithValue("@CategoryID", item.CategoryID);
                    command.Parameters.AddWithValue("@Title", item.Title);
                    command.Parameters.AddWithValue("@Description", (object)item.Description ?? DBNull.Value);
                    command.Parameters.AddWithValue("@StartingBid", item.StartingBid);
                    command.Parameters.AddWithValue("@ReservePrice", (object)item.ReservePrice ?? DBNull.Value);
                    command.Parameters.AddWithValue("@AuctionDuration", item.AuctionDuration);
                    command.Parameters.AddWithValue("@StartTime", item.StartTime.ToString("yyyy-MM-dd HH:mm:ss"));
                    command.Parameters.AddWithValue("@EndTime", item.EndTime.ToString("yyyy-MM-dd HH:mm:ss"));
                    command.Parameters.AddWithValue("@Status", item.Status);
                    command.Parameters.AddWithValue("@ItemID", item.ItemID);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task DeleteItem(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("DELETE FROM Items WHERE ItemID = @Id", connection))
                {
                    command.Parameters.AddWithValue("@Id", id);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}


