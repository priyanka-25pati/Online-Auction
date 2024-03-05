import { Component,OnInit } from '@angular/core';
import { BidService } from 'src/shared/services/bid.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

transactionId="";
constructor (private bidService:BidService)
{

}


ngOnInit(): void {
  this.transactionId = this.bidService.getTransactionID() || '';
 }
 
  

}
