using System;

namespace OnlineAuctionApp.Models
{
    public class Payments
    {
        public int PaymentID { get; set; }
        public int UserID { get; set; }
        public int ItemID { get; set; }
        public string PaymentMethod { get; set; }
        public string TransactionID { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = "pending"; // Default value set in the property
        public DateTime CreatedAt { get; set; } = DateTime.Now; // Default value set in the property
    }
}
