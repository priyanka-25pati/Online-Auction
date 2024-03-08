using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Repository;
using OnlineAuctionApp.Repository.Interfaces;
using OnlineAuctionApp.Services.Interfaces;

namespace OnlineAuctionApp.Services
{
    public class BidService : IBidService
    {
        private readonly IBid _bidRepo;

        public BidService(IBid bidRepo)
        {
            _bidRepo = bidRepo;
        }

        public async Task<Bids> CreateBidAsync(Bids bid)
        {
            return await _bidRepo.CreateBidAsync(bid);
        }

        public async Task<Bids> GetBidByIdAsync(int bidId)
        {
            return await _bidRepo.GetBidByIdAsync(bidId);
        }

        public async Task<IEnumerable<Bids>> GetAllBidsAsync()
        {
            return await _bidRepo.GetAllBidsAsync();
        }

        public async Task<Bids> UpdateBidAsync(Bids bid)
        {
            return await _bidRepo.UpdateBidAsync(bid);
        }

        public async Task<bool> DeleteBidAsync(int bidId)
        {
            return await _bidRepo.DeleteBidAsync(bidId);
        }

        public async Task<IEnumerable<Bids>> GetBidsForItemAsync(int itemId)
        {
            return await _bidRepo.GetBidsForItemAsync(itemId);
        }

        public async Task<double> GetCurrentHighestBidAsync(int itemId)
        {
            return await _bidRepo.GetCurrentHighestBidAsync(itemId);
        }

        public async Task<Bids> CreateBidWithRandomItemIdAsync(Bids bid)
        {
            return await _bidRepo.CreateBidWithRandomItemIdAsync(bid);
        }
    }
}
