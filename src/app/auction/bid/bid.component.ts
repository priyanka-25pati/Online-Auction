import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BidService } from 'src/shared/services/bid.service';
import { Bids } from 'src/shared/models/bid-interface';

@Component({
 selector: 'app-bid',
 templateUrl: './bid.component.html',
 styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {
 bidForm: FormGroup;
 bids: Bids[] = [];
 currentBid: number | null = null; // Initialize currentBid as null
 itemID!: number; // This will be set by the user

 constructor(private bidService: BidService) {
    this.bidForm = new FormGroup({
      itemID: new FormControl('', [Validators.required, Validators.min(1)]),
      newBid: new FormControl('', [Validators.required, Validators.min(1)]),
      bidderID: new FormControl('', [Validators.required, Validators.min(1)])
    });

    // Listen for changes to the itemID form control
    this.bidForm.get('itemID')?.valueChanges.subscribe(itemID => {
      if (itemID) {
        this.fetchCurrentHighestBid(itemID);
      }
    });
 }

 ngOnInit(): void {
  // Example: Fetching the current item ID from a service
  this.bidService.getCurrentItemId().subscribe(itemID => {
     if (itemID !== null) {
       this.itemID = itemID;
       this.loadBids(); // Ensure this method is correctly implemented
     }
  });
 }
 

 fetchCurrentHighestBid(itemID: number): void {
    this.bidService.getCurrentHighestBid(itemID).subscribe(
      currentBid => {
        this.currentBid = currentBid;
      },
      error => {
        console.error('Error fetching current highest bid:', error);
        this.currentBid = null; // Reset currentBid if there's an error
      }
    );
 }

 placeBid(): void {
    if (this.bidForm.valid) {
      const newBid = this.bidForm.get('newBid')?.value;
      const itemID = this.bidForm.get('itemID')?.value;
      const bidderID = this.bidForm.get('bidderID')?.value; // Fetch the bidder ID from the form
      if (newBid && itemID && bidderID) {
        this.bidService.placeBid({
          itemID: itemID,
          bidderID: bidderID, // Include the bidder ID in the request body
          amount: newBid,
          timestamp: new Date()
        }).subscribe(
          response => {
            // Assuming the response contains the generated bid ID
            // You might want to update the UI or state based on the response
            this.loadBids(); // Refresh the bids list after a successful bid
            this.fetchCurrentHighestBid(itemID); // Refresh the current highest bid
            alert('Bid placed successfully!');
          },
          error => {
            console.error('Error placing bid:', error);
            alert('Failed to place bid. Please try again.');
          }
        );
      }
    } else {
      alert('Please enter a valid bid.');
    }
 }

 loadBids(): void {
  if (this.itemID === null || this.itemID <= 0) {
     console.error('Invalid item ID');
     return;
  }
  this.bidService.getBidsForItem(this.itemID).subscribe(
     (bids: Bids[]) => {
       this.bids = bids;
       console.log(this.bids);
     },
     error => {
       console.error('Error fetching bids:', error);
     }
  );
 }
 
}
