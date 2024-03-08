import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemService } from 'src/shared/services/item.service';
import { Item } from 'src/shared/models/item-interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
 selector: 'app-listings',
 templateUrl: './listings.component.html',
 styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
 items$!: Observable<Item[]>;
 selectedItem: Item | null = null;
 updateForm!: FormGroup;
 message: string = ''; // Variable to hold the success or error message

 /**
 * Constructor for ListingsComponent.
 * @param {ItemService} itemService - The ItemService for fetching and managing items.
 */
 constructor(private itemService: ItemService,private router:Router) { }

 /**
 * Initializes the component by refreshing the items list and setting up the update form.
 */
 ngOnInit(): void {
    this.refreshItems();
    this.updateForm = new FormGroup({
      itemID: new FormControl({value: '', disabled: true}),
      sellerID: new FormControl({value: '', disabled: true}),
      categoryID: new FormControl({value: '', disabled: true}),
      title: new FormControl(''),
      description: new FormControl(''),
      startingBid: new FormControl(''),
      reservePrice: new FormControl(''),
      auctionDuration: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      status: new FormControl(''),
    });
 }
 navigateToAdmin()
 {
  this.router.navigate(['/admin']);
 }
 /**
 * Refreshes the items list by fetching the latest items from the server.
 */
 refreshItems(): void {
    this.items$ = this.itemService.getItems();
 }

 /**
 * Prepares the update form for editing an item.
 * @param {Item} item - The item to be updated.
 */
 onUpdate(item: Item): void {
    this.selectedItem = { ...item };
    this.updateForm.patchValue({
      itemID: this.selectedItem.itemID,
      sellerID: this.selectedItem.sellerID,
      categoryID: this.selectedItem.categoryID,
      title: this.selectedItem.title,
      description: this.selectedItem.description,
      startingBid: this.selectedItem.startingBid,
      reservePrice: this.selectedItem.reservePrice,
      auctionDuration: this.selectedItem.auctionDuration,
      startTime: this.selectedItem.startTime,
      endTime: this.selectedItem.endTime,
      status: this.selectedItem.status,
    });
 }

 /**
 * Submits the update form to update an item.
 */
 onSubmitUpdate(): void {
    if (this.selectedItem && this.updateForm.valid) {
      const updatedItem = { ...this.selectedItem, ...this.updateForm.value };
      this.itemService.updateItem(updatedItem).subscribe(() => {
        this.message = 'Item updated successfully';
        this.refreshItems(); // Refresh the items list
        this.selectedItem = null; // Close the form
      }, error => {
        this.message = 'Failed to update item: ' + error.message;
      });
    }
 }

 /**
 * Deletes an item by its ID.
 * @param {number} itemID - The ID of the item to be deleted.
 */
 onDelete(itemID: number): void {
    this.itemService.deleteItem(itemID).subscribe(() => {
      this.message = 'Item deleted successfully';
      this.refreshItems(); // Refresh the items list
    }, error => {
      this.message = 'Failed to delete item: ' + error.message;
    });
 }
}
