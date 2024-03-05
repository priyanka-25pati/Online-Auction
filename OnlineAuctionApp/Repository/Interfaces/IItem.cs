using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;

namespace OnlineAuctionApp.Repository.Interfaces
{
    public interface IItemRepository
    {
        Task<IEnumerable<Items>> GetItems();
        Task<Items> GetItem(int id);
        Task AddItem(Items item);
        Task UpdateItem(Items item);
        Task DeleteItem(int id);
    }
}
