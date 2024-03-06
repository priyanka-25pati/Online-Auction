import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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
 successMessage: string | null = null;

 /**
 * Constructor for BidComponent.
 * @param {BidService} bidService - The BidService for handling bids.
 */
 constructor(private bidService: BidService) {
    this.bidForm = new FormGroup({
      itemID: new FormControl('', [Validators.required, Validators.min(1)]),
      newBid: new FormControl('', [Validators.required, Validators.min(1), this.greaterThanCurrentBid(this.currentBid)]),
      bidderID: new FormControl('', [Validators.required, Validators.min(1)])
    });

    // Listen for changes to the itemID form control
    this.bidForm.get('itemID')?.valueChanges.subscribe(itemID => {
      if (itemID) {
        this.fetchCurrentHighestBid(itemID);
      }
    });
 }

 /**
 * Initializes the component by fetching the current item ID and loading bids.
 */
 ngOnInit(): void {
    // Example: Fetching the current item ID from a service
    this.bidService.getCurrentItemId().subscribe(itemID => {
      if (itemID !== null) {
        this.itemID = itemID;
        this.loadBids(); // Ensure this method is correctly implemented
      }
    });
 }

 /**
 * Custom validator function to ensure the new bid is greater than the current bid.
 * @param {number | null} currentBid - The current highest bid.
 * @returns {ValidatorFn} A validator function.
 */
 greaterThanCurrentBid(currentBid: number | null): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const newBid = control.value;
      if (currentBid !== null && newBid <= currentBid) {
        return { 'greaterThanCurrentBid': true };
      }
      return null;
    };
 }

 /**
 * Fetches the current highest bid for an item.
 * @param {number} itemID - The ID of the item.
 */
 fetchCurrentHighestBid(itemID: number): void {
    this.bidService.getCurrentHighestBid(itemID).subscribe(
      currentBid => {
        this.currentBid = currentBid;
        // Update the validator for the newBid form control
        this.bidForm.get('newBid')?.setValidators([Validators.required, Validators.min(1), this.greaterThanCurrentBid(this.currentBid)]);
        this.bidForm.get('newBid')?.updateValueAndValidity(); // Update the form control's value and validation status
      },
      error => {
        console.error('Error fetching current highest bid:', error);
        this.currentBid = null; // Reset currentBid if there's an error
        // Reset the validator for the newBid form control
        this.bidForm.get('newBid')?.setValidators([Validators.required, Validators.min(1)]);
        this.bidForm.get('newBid')?.updateValueAndValidity(); // Update the form control's value and validation status
      }
    );
 }

 /**
 * Places a new bid for an item.
 */
 placeBid(): void {
 if (this.bidForm.valid) {
     const newBid = this.bidForm.get('newBid')?.value;
     const itemID = this.bidForm.get('itemID')?.value;
     const bidderID = this.bidForm.get('bidderID')?.value; // Fetch the bidder ID from the form
     if (newBid && itemID && bidderID) {
       // Clear any previous validation errors
       Object.keys(this.bidForm.controls).forEach(field => {
         const control = this.bidForm.get(field);
         if (control) { // Check if control is not null
           control.setErrors(null);
         }
       });
 
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
           this.successMessage = 'Bid placed successfully!'; // Set the success message
           setTimeout(() => {
             this.successMessage = null; // Clear the success message after a delay
             this.bidForm.reset(); // Reset the form
             this.currentBid = null; // Clear the currentBid property
           }, 3000); // Reset and clear message after 3 seconds
         },
         error => {
           console.error('Error placing bid:', error);
           this.successMessage = 'Failed to place bid. Please try again.'; // Set an error message
           setTimeout(() => {
             this.successMessage = null; // Clear the error message after a delay
           }, 3000); // Clear message after 3 seconds
         }
       );
     }
 } else {
     this.successMessage = 'Please enter a valid bid.'; // Set an error message for invalid form
     setTimeout(() => {
       this.successMessage = null; // Clear the error message after a delay
     }, 3000); // Clear message after 3 seconds
 }
 }
 
 /**
 * Loads the bids for the current item.
 */
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
