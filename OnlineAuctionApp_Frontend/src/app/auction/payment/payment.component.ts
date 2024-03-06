import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BidService } from 'src/shared/services/bid.service';
import { ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-payment',
 templateUrl: './payment.component.html',
 styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
 amount!: number;

 @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

 payment: any = {}; // Initialize payment as an object

 /**
 * Constructor for PaymentComponent.
 * @param {Router} router - The Router service for navigation.
 * @param {BidService} bidService - The BidService for handling bids.
 * @param {ActivatedRoute} route - The ActivatedRoute service for accessing route parameters.
 */
 constructor(private router: Router, private bidService: BidService, private route: ActivatedRoute) {}

 /**
 * Initializes the component by fetching the payment amount from the route query parameters.
 */
 ngOnInit(): void {
 this.route.queryParams.subscribe(params => {
     console.log('Query parameters:', params); // Log all query parameters
     const amount = params['amount'];
     if (amount) {
       this.amount = +amount; // Convert to number
       // Now you can use this.amount for your payment logic
       this.initializePayPalButton(); // Initialize PayPal button after amount is set
     } else {
       console.error('No amount provided in query parameters.');
     }
 });
 }

 /**
 * Initializes the PayPal button for payment processing.
 */
 initializePayPalButton() {
    console.log(window.paypal);
    if (window.paypal) {
      window.paypal.Buttons(
        {
          style: {
            layout: 'horizontal',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
          },
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                 amount: {
                    value: this.amount.toString(),
                    currency_code: 'USD'
                 }
                }
              ]
            })
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              console.log(details);
              if (details.status === "COMPLETED") {
                this.payment.transactionID = details.id;
                this.router.navigate(['/confirmation']); 
              }
            });
          },
          onError: (error: any) => {
            console.log(error);
          }
        }
      ).render(this.paymentRef.nativeElement);
    } else {
      console.error('PayPal SDK not loaded.');
    }
 }

 /**
 * Handles the cancellation of the payment process.
 */
 cancel() {
    this.router.navigate(['/auction/checkout']);
 }
}
