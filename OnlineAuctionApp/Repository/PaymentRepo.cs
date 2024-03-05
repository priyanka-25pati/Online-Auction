using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Repository.Interfaces;

namespace OnlineAuctionApp.Repository
{
    public class PaymentRepo : IPayment
    {
        private readonly string _connectionString = "Data Source=APINP-ELPT9P8ER\\SQLEXPRESS;Initial Catalog=Auction;User ID=tap2023;Password=tap2023;Encrypt=False";

        public async Task<IEnumerable<Payments>> GetAllPaymentsAsync()
        {
            var payments = new List<Payments>();
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("SELECT * FROM Payments", connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            payments.Add(new Payments
                            {
                                PaymentID = reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                UserID = reader.GetInt32(reader.GetOrdinal("UserID")),
                                ItemID = reader.GetInt32(reader.GetOrdinal("ItemID")),
                                PaymentMethod = reader.GetString(reader.GetOrdinal("PaymentMethod")),
                                TransactionID = reader.IsDBNull(reader.GetOrdinal("TransactionID")) ? null : reader.GetString(reader.GetOrdinal("TransactionID")),
                                Amount = reader.GetDecimal(reader.GetOrdinal("Amount")),
                                Status = reader.GetString(reader.GetOrdinal("Status")),
                                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
                            });
                        }
                    }
                }
            }
            return payments;
        }

        public async Task<Payments> GetPaymentByIdAsync(int paymentId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("SELECT * FROM Payments WHERE PaymentID = @PaymentID", connection))
                {
                    command.Parameters.AddWithValue("@PaymentID", paymentId);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return new Payments
                            {
                                PaymentID = reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                UserID = reader.GetInt32(reader.GetOrdinal("UserID")),
                                ItemID = reader.GetInt32(reader.GetOrdinal("ItemID")),
                                PaymentMethod = reader.GetString(reader.GetOrdinal("PaymentMethod")),
                                TransactionID = reader.IsDBNull(reader.GetOrdinal("TransactionID")) ? null : reader.GetString(reader.GetOrdinal("TransactionID")),
                                Amount = reader.GetDecimal(reader.GetOrdinal("Amount")),
                                Status = reader.GetString(reader.GetOrdinal("Status")),
                                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
                            };
                        }
                    }
                }
            }
            return null; // Return null if no payment is found
        }

        public async Task<Payments> AddPaymentAsync(Payments payment)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("INSERT INTO Payments (UserID, ItemID, PaymentMethod, TransactionID, Amount, Status) VALUES (@UserID, @ItemID, @PaymentMethod, @TransactionID, @Amount, @Status); SELECT SCOPE_IDENTITY()", connection))
                {
                    command.Parameters.AddWithValue("@UserID", payment.UserID);
                    command.Parameters.AddWithValue("@ItemID", payment.ItemID);
                    command.Parameters.AddWithValue("@PaymentMethod", payment.PaymentMethod);
                    command.Parameters.AddWithValue("@TransactionID", payment.TransactionID ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Amount", payment.Amount);
                    command.Parameters.AddWithValue("@Status", payment.Status);

                    var paymentId = Convert.ToInt32(await command.ExecuteScalarAsync());
                    payment.PaymentID = paymentId;
                }
            }
            return payment;
        }

        public async Task<Payments> UpdatePaymentAsync(Payments payment)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("UPDATE Payments SET UserID = @UserID, ItemID = @ItemID, PaymentMethod = @PaymentMethod, TransactionID = @TransactionID, Amount = @Amount, Status = @Status WHERE PaymentID = @PaymentID", connection))
                {
                    command.Parameters.AddWithValue("@UserID", payment.UserID);
                    command.Parameters.AddWithValue("@ItemID", payment.ItemID);
                    command.Parameters.AddWithValue("@PaymentMethod", payment.PaymentMethod);
                    command.Parameters.AddWithValue("@TransactionID", payment.TransactionID ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Amount", payment.Amount);
                    command.Parameters.AddWithValue("@Status", payment.Status);
                    command.Parameters.AddWithValue("@PaymentID", payment.PaymentID);

                    await command.ExecuteNonQueryAsync();
                }
            }
            return payment;
        }

        public async Task DeletePaymentAsync(int paymentId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("DELETE FROM Payments WHERE PaymentID = @PaymentID", connection))
                {
                    command.Parameters.AddWithValue("@PaymentID", paymentId);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}
