using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;

namespace OnlineAuctionApp.Services.Interfaces
{
    public interface IItemService
    {
        Task<IEnumerable<Items>> GetItems();
        Task<Items> GetItem(int id);
        Task<Items> AddItem(Items item);
        Task<Items> UpdateItem(Items item);
        Task<bool> DeleteItem(int id);
    }
}
