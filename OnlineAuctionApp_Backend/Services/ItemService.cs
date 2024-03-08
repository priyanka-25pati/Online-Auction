using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Repository.Interfaces;
using OnlineAuctionApp.Services.Interfaces;

namespace OnlineAuctionApp.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;

        public ItemService(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository ?? throw new ArgumentNullException(nameof(itemRepository));
        }

        public async Task<IEnumerable<Items>> GetItems()
        {
            return await _itemRepository.GetItems();
        }

        public async Task<Items> GetItem(int id)
        {
            return await _itemRepository.GetItem(id);
        }

        public async Task<Items> AddItem(Items item)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item));
            }

           

            await _itemRepository.AddItem(item);
            return item; 
        }


        public async Task<Items> UpdateItem(Items item)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item));
            }
            await _itemRepository.UpdateItem(item);
            return item; 
        }


        public async Task<bool> DeleteItem(int id)
        {
            await _itemRepository.DeleteItem(id);
            return true;
        }
    }
}
