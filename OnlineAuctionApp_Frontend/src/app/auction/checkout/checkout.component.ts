import { Component } from '@angular/core';
import { BidService } from 'src/shared/services/bid.service';
import { Router } from '@angular/router'; // Import Router

/**
 * Component for handling checkout process.
 */
@Component({
 selector: 'app-checkout',
 templateUrl: './checkout.component.html',
 styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
 /**
   * Current highest bid for the item.
   */
 currentBid: number | null = null;

 /**
   * @param bidService - BidService for fetching the current highest bid.
   * @param router - Router for navigation.
   */
 constructor(private bidService: BidService, private router: Router) {} // Inject Router

 /**
   * Fetches the current highest bid for a given item ID.
   * @param itemID - The ID of the item to fetch the highest bid for.
   */
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

 /**
   * Navigates to the payment page with the current highest bid as a query parameter.
   */
 navigateToPaymentPage(): void {
    if (this.currentBid !== null) {
        this.router.navigate(['/payment'], { queryParams: { amount: this.currentBid } });
    } else {
        console.error('Cannot navigate to payment page without a current bid.');
    }
 }
}
