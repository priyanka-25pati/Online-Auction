import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemService } from 'src/shared/services/item.service';
import { Item } from 'src/shared/models/item-interface';
import { Observable } from 'rxjs';

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

 constructor(private itemService: ItemService) { }

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

 refreshItems(): void {
    this.items$ = this.itemService.getItems();
 }

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

 onDelete(itemID: number): void {
    this.itemService.deleteItem(itemID).subscribe(() => {
      this.message = 'Item deleted successfully';
      this.refreshItems(); // Refresh the items list
    }, error => {
      this.message = 'Failed to delete item: ' + error.message;
    });
 }
}
