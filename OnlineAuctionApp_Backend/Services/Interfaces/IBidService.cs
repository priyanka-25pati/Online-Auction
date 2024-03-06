using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;

namespace OnlineAuctionApp.Services.Interfaces
{
    public interface IBidService
    {
        // Create a new bid
        Task<Bids> CreateBidAsync(Bids bid);

        // Create a new bid with a random item ID
        Task<Bids> CreateBidWithRandomItemIdAsync(Bids bid);

        // Retrieve a bid by its ID
        Task<Bids> GetBidByIdAsync(int bidId);

        // Retrieve all bids
        Task<IEnumerable<Bids>> GetAllBidsAsync();

        // Update an existing bid
        Task<Bids> UpdateBidAsync(Bids bid);

        // Delete a bid by its ID
        Task<bool> DeleteBidAsync(int bidId);

        // Retrieve all bids for a specific item
        Task<IEnumerable<Bids>> GetBidsForItemAsync(int itemId);

        // Retrieve the current highest bid for a specific item
        Task<double> GetCurrentHighestBidAsync(int itemId);
    }
}
