using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;

namespace OnlineAuctionApp.Services.Interfaces
{
    public interface IBidService
    {
        Task<Bids> CreateBidAsync(Bids bid);

        Task<Bids> CreateBidWithRandomItemIdAsync(Bids bid);

        Task<Bids> GetBidByIdAsync(int bidId);

       
        Task<IEnumerable<Bids>> GetAllBidsAsync();

      
        Task<Bids> UpdateBidAsync(Bids bid);

        Task<bool> DeleteBidAsync(int bidId);

        Task<IEnumerable<Bids>> GetBidsForItemAsync(int itemId);

        Task<double> GetCurrentHighestBidAsync(int itemId);
    }
}
