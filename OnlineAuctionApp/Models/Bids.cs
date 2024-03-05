namespace OnlineAuctionApp.Models
{
    public class Bids
    {
        public int BidID { get; set; }
        public int ItemID { get; set; }
        public int BidderID { get; set; }
        public decimal Amount { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
