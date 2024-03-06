using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Repository.Interfaces;

namespace OnlineAuctionApp.Repository
{
    public class BidRepo : IBid
    {
        private readonly string _connectionString = "Data Source=APINP-ELPT9P8ER\\SQLEXPRESS;Initial Catalog=Auction;User ID=tap2023;Password=tap2023;Encrypt=False";
        private static readonly Random _random = new Random();

        public async Task<Bids> CreateBidAsync(Bids bid)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("INSERT INTO Bids (ItemID, BidderID, Amount) VALUES (@ItemID, @BidderID, @Amount); SELECT SCOPE_IDENTITY();", connection))
                {
                    command.Parameters.AddWithValue("@ItemID", bid.ItemID);
                    command.Parameters.AddWithValue("@BidderID", bid.BidderID);
                    command.Parameters.AddWithValue("@Amount", bid.Amount);

                    bid.BidID = Convert.ToInt32(await command.ExecuteScalarAsync());
                }
            }
            return bid;
        }

        public async Task<Bids> GetBidByIdAsync(int bidId)
        {
            Bids bid = null;
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("SELECT * FROM Bids WHERE BidID = @BidID", connection))
                {
                    command.Parameters.AddWithValue("@BidID", bidId);
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            bid = new Bids
                            {
                                BidID = reader.GetInt32(reader.GetOrdinal("BidID")),
                                ItemID = reader.GetInt32(reader.GetOrdinal("ItemID")),
                                BidderID = reader.GetInt32(reader.GetOrdinal("BidderID")),
                                Amount = reader.GetDecimal(reader.GetOrdinal("Amount")),
                                Timestamp = reader.GetDateTime(reader.GetOrdinal("Timestamp"))
                            };
                        }
                    }
                }
            }
            return bid;
        }

        public async Task<IEnumerable<Bids>> GetAllBidsAsync()
        {
            List<Bids> bids = new List<Bids>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("SELECT * FROM Bids", connection))
                {
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            bids.Add(new Bids
                            {
                                BidID = reader.GetInt32(reader.GetOrdinal("BidID")),
                                ItemID = reader.GetInt32(reader.GetOrdinal("ItemID")),
                                BidderID = reader.GetInt32(reader.GetOrdinal("BidderID")),
                                Amount = reader.GetDecimal(reader.GetOrdinal("Amount")),
                                Timestamp = reader.GetDateTime(reader.GetOrdinal("Timestamp"))
                            });
                        }
                    }
                }
            }
            return bids;
        }

        public async Task<Bids> UpdateBidAsync(Bids bid)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("UPDATE Bids SET ItemID = @ItemID, BidderID = @BidderID, Amount = @Amount WHERE BidID = @BidID", connection))
                {
                    command.Parameters.AddWithValue("@ItemID", bid.ItemID);
                    command.Parameters.AddWithValue("@BidderID", bid.BidderID);
                    command.Parameters.AddWithValue("@Amount", bid.Amount);
                    command.Parameters.AddWithValue("@BidID", bid.BidID);

                    await command.ExecuteNonQueryAsync();
                }
            }
            return bid;
        }

        public async Task<bool> DeleteBidAsync(int bidId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("DELETE FROM Bids WHERE BidID = @BidID", connection))
                {
                    command.Parameters.AddWithValue("@BidID", bidId);

                    int rowsAffected = await command.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
            }
        }

        public async Task<IEnumerable<Bids>> GetBidsForItemAsync(int itemId)
        {
            List<Bids> bids = new List<Bids>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("SELECT * FROM Bids WHERE ItemID = @ItemID", connection))
                {
                    command.Parameters.AddWithValue("@ItemID", itemId);
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            bids.Add(new Bids
                            {
                                BidID = reader.GetInt32(reader.GetOrdinal("BidID")),
                                ItemID = reader.GetInt32(reader.GetOrdinal("ItemID")),
                                BidderID = reader.GetInt32(reader.GetOrdinal("BidderID")),
                                Amount = reader.GetDecimal(reader.GetOrdinal("Amount")),
                                Timestamp = reader.GetDateTime(reader.GetOrdinal("Timestamp"))
                            });
                        }
                    }
                }
            }
            return bids;
        }

        public async Task<double> GetCurrentHighestBidAsync(int itemId)
        {
            if (itemId <= 0)
            {
                throw new ArgumentException("Invalid item ID", nameof(itemId));
            }

            double currentHighestBid = 0;
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("SELECT MAX(Amount) FROM Bids WHERE ItemID = @ItemID", connection))
                {
                    command.Parameters.AddWithValue("@ItemID", itemId);
                    object result = await command.ExecuteScalarAsync();
                    if (result != null)
                    {
                        currentHighestBid = Convert.ToDouble(result);
                    }
                }
            }
            return currentHighestBid;
        }

        // Function to generate a random item ID
        public int GenerateRandomItemId()
        {
            // Generate a random item ID between 1 and 1000
            return _random.Next(1, 1001);
        }

        // Method to create a bid with a random item ID
        public async Task<Bids> CreateBidWithRandomItemIdAsync(Bids bid)
        {
            // Generate a random item ID
            int randomItemId = GenerateRandomItemId();

            // Assign the random item ID to the bid
            bid.ItemID = randomItemId;

            // Proceed with creating the bid as usual
            return await CreateBidAsync(bid);
        }
    }
}
