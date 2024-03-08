using OnlineAuctionApp.Repository.Interfaces;
using System;

namespace OnlineAuctionApp.Models
{
    public class Items
    {
        public int ItemID { get; set; }
        public int SellerID { get; set; }
        public int CategoryID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal StartingBid { get; set; }
        public decimal? ReservePrice { get; set; }
        public int AuctionDuration { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Status { get; set; }
/*        public string Image { get; set; }*/
        /*   public DateTime CreatedAt { get; set; }
           public DateTime UpdatedAt { get; set; }
   */

    }
}
