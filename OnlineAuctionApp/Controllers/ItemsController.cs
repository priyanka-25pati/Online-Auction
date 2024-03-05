using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Services.Interfaces;
using OnlineAuctionApp.Repository.Interfaces;

namespace OnlineAuctionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Items>>> GetItems()
        {
            var items = await _itemService.GetItems();
            return Ok(items);
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Items>> GetItem(int id)
        {
            var item = await _itemService.GetItem(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        // POST: api/Items
        [HttpPost]
        public async Task<ActionResult<Items>> PostItem(Items item)
        {
            await _itemService.AddItem(item);
            return CreatedAtAction(nameof(GetItem), new { id = item.ItemID }, item);
        }

        // PUT: api/Items/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, Items item)
        {
            if (id != item.ItemID)
            {
                return BadRequest();
            }
            await _itemService.UpdateItem(item);
            return NoContent();
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            await _itemService.DeleteItem(id);
            return NoContent();
        }
    }
}
