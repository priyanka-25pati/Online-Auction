import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListingComponent } from './item-listing/item-listing.component';
import { BidComponent } from './bid/bid.component';

import { AuthsecGuard } from '../security/authsec.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
const routes: Routes = [
 
  { path: 'item-listing', component: ItemListingComponent ,canActivate: [AuthsecGuard]},
  { path: 'bid', component: BidComponent,canActivate: [AuthsecGuard] },
{path:'user-details', component:UserDetailsComponent,canActivate: [AuthsecGuard]},

  { path: 'payment', component: PaymentComponent ,canActivate: [AuthsecGuard]},
  { path: 'checkout', component: CheckoutComponent ,canActivate: [AuthsecGuard]},
  {path:'confirmation', component:ConfirmationComponent,canActivate: [AuthsecGuard]},
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
