import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Bids } from '../models/bid-interface';
import { urls } from 'src/urls';

@Injectable({
 providedIn: 'root'
})
export class BidService {
   transactionID!: string;
 private itemIdSource = new BehaviorSubject<number | null>(null);
 currentItemId = this.itemIdSource.asObservable();

 constructor(private http: HttpClient) { }

 changeItemId(itemID: number): void {
    if (itemID === null || itemID <= 0) {
        console.error('Invalid item ID');
        return;
    }
    this.itemIdSource.next(itemID);
 }
 setTransactionID(id: string): void {
  this.transactionID = id;
}

// Method to get the transaction ID
getTransactionID(): string | null {
  return this.transactionID;
}
 getBidsForItem(itemID: number): Observable<Bids[]> {
  console.log('Fetching bids for item ID:', itemID); // Debug line
  if (itemID === null || itemID <= 0) {
     return throwError('Invalid item ID');
  }
  const url = `${urls.getBidId}/${itemID}`;
  return this.http.get<Bids[]>(url).pipe(
     catchError(this.handleError)
  );
 }
 
 
 getCurrentHighestBid(itemID: number): Observable<number> {
 if (itemID === null || itemID <= 0) {
      return throwError('Invalid item ID');
 }

 const url = `${urls.getCurrentHighestBid}/${itemID}`;
 return this.http.get<number>(url).pipe(
      catchError(this.handleError)
 );
}

placeBid(bid: Bids): Observable<Bids> {
 return this.http.post<Bids>(urls.placeBid, bid).pipe(
      catchError(this.handleError)
 );
}

getCurrentItemId(): Observable<number> {
    return this.currentItemId.pipe(
        map(itemID => itemID !== null ? itemID : 0) // Provide a default value of 0 if itemId is null
    );
}

private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
}
}
