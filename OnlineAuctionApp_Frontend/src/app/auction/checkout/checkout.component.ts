import { Component } from '@angular/core';
import { BidService } from 'src/shared/services/bid.service';
import { Router } from '@angular/router'; // Import Router

@Component({
 selector: 'app-checkout',
 templateUrl: './checkout.component.html',
 styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
 currentBid: number | null = null;

 constructor(private bidService: BidService, private router: Router) {} // Inject Router

 fetchCurrentHighestBid(itemID: number): void {
    this.bidService.getCurrentHighestBid(itemID).subscribe(
      currentBid => {
        this.currentBid = currentBid;
        // Do not navigate here, just update the currentBid
      },
      error => {
        console.error('Error fetching current highest bid:', error);
        this.currentBid = null; // Reset currentBid if there's an error
      }
    );
 }

 navigateToPaymentPage(): void {
    if (this.currentBid !== null) {
        this.router.navigate(['/payment'], { queryParams: { amount: this.currentBid } });
    } else {
        console.error('Cannot navigate to payment page without a current bid.');
    }
 }
}
