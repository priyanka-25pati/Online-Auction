import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/shared/services/item.service';
import { BidService } from 'src/shared/services/bid.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Item } from 'src/shared/models/item-interface';
import { AuthService } from 'src/shared/services/auth.service';
import { map } from 'rxjs/operators'; // Import map operator

@Component({
 selector: 'app-item-listing',
 templateUrl: './item-listing.component.html',
 styleUrls: ['./item-listing.component.scss']
})
export class ItemListingComponent implements OnInit {
 itemForm: FormGroup;
 items$: Observable<Item[]>;
 showAddItemForm = false;
 responseMessage: string = '';
 errorMessage: string = '';
 searchTerm: string = ''; // Property for search term

 /**
 * Constructor for ItemListingComponent.
 * @param {FormBuilder} formBuilder - The FormBuilder service for creating forms.
 * @param {ItemService} itemService - The ItemService for fetching and listing items.
 * @param {BidService} bidService - The BidService for handling bids.
 * @param {Router} router - The Router service for navigation.
 * @param {AuthService} authService - The AuthService for authentication.
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
 * Initializes the component by fetching the list of items.
 */
 ngOnInit(): void {
    this.items$ = this.itemService.getItems();
    this.items$.subscribe(items => {
      console.log(items); // Log the items to verify their structure
    });
 }

 /**
 * Handles search input change and updates the items$ observable to filter based on the search term.
 * @param {any} event - The event object from the search input change.
 */
 onSearchTermChange(event: any): void {
    this.searchTerm = event.target.value;
    this.items$ = this.getFilteredItems();
 }

 /**
 * Filters the items based on the search term.
 * @returns {Observable<Item[]>} An Observable of the filtered items.
 */
 getFilteredItems(): Observable<Item[]> {
    return this.itemService.getItems().pipe(
      map(items => items.filter(item => item.title.toLowerCase().includes(this.searchTerm.toLowerCase())))
    );
 }

 /**
 * Logs the user out.
 */
 logout(): void {
    this.authService.logout();
 }

 /**
 * Logs the validation status and errors of the item form.
 */
 logFormValidationStatus(): void {
    console.log('Form valid:', this.itemForm.valid);
    console.log('Form errors:', this.itemForm.errors);
    console.log('Form controls:', this.itemForm.controls);
 }

 /**
 * Handles the form submission for listing a new item.
 */
 onSubmit(): void {
    this.logFormValidationStatus();
    if (this.itemForm.valid) {
      const item: Item = this.itemForm.value;
      this.itemService.listItem(item).subscribe({
        next: (response: Item) => {
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
 * Navigates to the bid page for a specific item.
 * @param {number} itemId - The ID of the item to bid on.
 */
 bidOnItem(itemId: number): void {
    this.bidService.changeItemId(itemId);
    this.router.navigate(['/bid']);
 }
}
