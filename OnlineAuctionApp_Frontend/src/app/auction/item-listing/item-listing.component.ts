

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/shared/services/item.service';
import { BidService } from 'src/shared/services/bid.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Item } from 'src/shared/models/item-interface';
import { AuthService } from 'src/shared/services/auth.service';
import { map } from 'rxjs/operators';

/**
 * Component for listing items.
 */
@Component({
 selector: 'app-item-listing',
 templateUrl: './item-listing.component.html',
 styleUrls: ['./item-listing.component.scss']
})
export class ItemListingComponent implements OnInit {
 /**
   * Form group for item listing.
   */
 itemForm: FormGroup;

 /**
   * Observable stream of items.
   */
 items$: Observable<Item[]>;

 /**
   * Flag to show or hide the add item form.
   */
 showAddItemForm = false;

 /**
   * Response message to display after successful operations.
   */
 responseMessage: string = '';

 /**
   * Error message to display after failed operations.
   */
 errorMessage: string = '';

 /**
   * Search term for filtering items.
   */
 searchTerm: string = '';

 /**
   * @param formBuilder - FormBuilder service for creating forms.
   * @param itemService - ItemService for item operations.
   * @param bidService - BidService for bid operations.
   * @param router - Router for navigation.
   * @param authService - AuthService for authentication operations.
   */
 constructor(private formBuilder: FormBuilder, private itemService: ItemService, private bidService: BidService, private router: Router, private authService: AuthService) {
    this.itemForm = this.formBuilder.group({
      itemID: ['', Validators.required],
      sellerID: ['', Validators.required],
      categoryID: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      startingBid: ['', [Validators.required, Validators.min(0)]],
      reservePrice: ['', Validators.min(0)],
      auctionDuration: ['', [Validators.required, Validators.min(1)]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.items$ = this.itemService.getItems();
 }

 /**
   * Initialization logic.
   */
 ngOnInit(): void {
    this.items$ = this.itemService.getItems();
    this.items$.subscribe(items => {
      console.log(items); // Log the items to verify their structure
    });
 }

 /**
   * Handles changes to the search term.
   * @param event - The event object.
   */
 onSearchTermChange(event: any): void {
    this.searchTerm = event.target.value;
    this.items$ = this.getFilteredItems();
 }

 /**
   * Filters items based on the search term.
   * @returns Observable stream of filtered items.
   */
 getFilteredItems(): Observable<Item[]> {
    return this.itemService.getItems().pipe(
      map(items => items.filter(item => item.title.toLowerCase().includes(this.searchTerm.toLowerCase())))
    );
 }

 /**
   * Logs out the current user.
   */
 logout(): void {
    this.authService.logout();
 }

 /**
   * Logs the validation status of the item form.
   */
 logFormValidationStatus(): void {
    console.log('Form valid:', this.itemForm.valid);
    console.log('Form errors:', this.itemForm.errors);
    console.log('Form controls:', this.itemForm.controls);
 }

 /**
   * Submits the item form.
   */
 onSubmit(): void {
    this.logFormValidationStatus();
    if (this.itemForm.valid) {
      const item: Item = this.itemForm.value;
      console.log('Submitting item with ID:', item.itemID); // Log the itemID before submission
      this.itemService.listItem(item).subscribe({
        next: (response: Item) => {
          // Assuming the response contains the itemID
          const itemID = response.itemID;
          console.log('Item ID from response:', itemID);
          // Store the itemID in local storage as a string
          localStorage.setItem('lastItemID', itemID.toString());
          console.log('ItemID stored in local storage:', localStorage.getItem('lastItemID')); // Log the stored itemID

          this.responseMessage = 'Item listed successfully';
          this.showAddItemForm = false;
          this.itemForm.reset();
        },
        error: (error) => {
          console.error('Error listing item:', error);
          this.errorMessage = 'Error listing item';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields';
    }
 }

 /**
   * Bids on an item.
   * @param itemId - The ID of the item to bid on.
   */
 bidOnItem(itemId: number): void {
    this.bidService.changeItemId(itemId);
    this.router.navigate(['/bid']);
 }
}





