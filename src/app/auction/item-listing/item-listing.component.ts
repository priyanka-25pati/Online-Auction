import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/shared/services/item.service';
import { BidService } from 'src/shared/services/bid.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Item } from 'src/shared/models/item-interface';
import { AuthService } from 'src/shared/services/auth.service';
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

 constructor(private formBuilder: FormBuilder, private itemService: ItemService, private bidService: BidService, private router: Router,private authService: AuthService) {
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
 logout(): void {
  this.authService.logout();
}


 ngOnInit(): void {
  this.items$ = this.itemService.getItems();
  this.items$.subscribe(items => {
      console.log(items); // Log the items to verify their structure
  });
}



 logFormValidationStatus(): void {
    console.log('Form valid:', this.itemForm.valid);
    console.log('Form errors:', this.itemForm.errors);
    console.log('Form controls:', this.itemForm.controls);
 }

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

 bidOnItem(itemId: number): void {
    this.bidService.changeItemId(itemId);
    this.router.navigate(['/bid']);
 }

}
