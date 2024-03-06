import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionComponent } from './auction.component';
import { ItemListingComponent } from './item-listing/item-listing.component';
import { BidComponent } from './bid/bid.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { ReactiveFormsModule } from '@angular/forms';

import { UserDetailsComponent } from './user-details/user-details.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AuctionComponent,
    ItemListingComponent,
    BidComponent,
     UserDetailsComponent,
        PaymentComponent,
        ConfirmationComponent,
        CheckoutComponent
  ],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  
  ]
})
export class AuctionModule { }
