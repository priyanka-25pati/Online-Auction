using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuctionApp.Models;
using OnlineAuctionApp.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace OnlineAuctionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly IBidService _bidService;

        public BidsController(IBidService bidService)
        {
            _bidService = bidService;
        }

        // GET: api/Bids
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bids>>> GetBids()
        {
            var bids = await _bidService.GetAllBidsAsync();
            return Ok(bids);
        }

        // GET: api/Bids/Item/{itemId}
        [HttpGet("Item/{itemId}")]
        public async Task<ActionResult<IEnumerable<Bids>>> GetBidsForItem(int itemId)
        {
            var bids = await _bidService.GetBidsForItemAsync(itemId);
            if (bids == null)
            {
                return NotFound();
            }
            return Ok(bids);
        }
        // GET: api/Bids/CurrentHighest/{itemId}
        [HttpGet("CurrentHighest/{itemId}")]
        public async Task<ActionResult<double>> GetCurrentHighestBid(int itemId)
        {
            var currentHighestBid = await _bidService.GetCurrentHighestBidAsync(itemId);
            // Assuming -1 is used to indicate no bids were found for the item
            if (currentHighestBid == -1)
            {
                return NotFound("No bids found for the specified item.");
            }
            return Ok(currentHighestBid);
        }


        // GET: api/Bids/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bids>> GetBid(int id)
        {
            var bid = await _bidService.GetBidByIdAsync(id);
            if (bid == null)
            {
                return NotFound();
            }
            return Ok(bid);
        }

        // POST: api/Bids
        [HttpPost]
        public async Task<ActionResult<Bids>> PostBid(Bids bid)
        {
            await _bidService.CreateBidAsync(bid);
            return CreatedAtAction(nameof(GetBid), new { id = bid.BidID }, bid);
        }

        // PUT: api/Bids/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBid(int id, Bids bid)
        {
            if (id != bid.BidID)
            {
                return BadRequest();
            }
            await _bidService.UpdateBidAsync(bid);
            return NoContent();
        }

        // DELETE: api/Bids/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBid(int id)
        {
            bool result = await _bidService.DeleteBidAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
