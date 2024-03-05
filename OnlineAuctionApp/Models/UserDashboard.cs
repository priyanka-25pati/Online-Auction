namespace OnlineAuctionApp.Models
{
    public class UserDashboard
    {
        public int DashboardID { get; set; }
        public int UserID { get; set; }
        public string WatchedItems { get; set; }
        public string Bids { get; set; }
        public string PurchasedItems { get; set; }
        public string SellingActivities { get; set; }
    }
}
