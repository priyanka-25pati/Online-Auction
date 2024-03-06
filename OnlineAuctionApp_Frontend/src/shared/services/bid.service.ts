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

 /**
 * Constructor for BidService.
 */
 constructor(private http: HttpClient) { }

 /**
 * Changes the current item ID and emits the new value to subscribers.
 * @param {number} itemID - The new item ID.
 */
 changeItemId(itemID: number): void {
    if (itemID === null || itemID <= 0) {
        console.error('Invalid item ID');
        return;
    }
    this.itemIdSource.next(itemID);
 }

 /**
 * Sets the transaction ID.
 * @param {string} id - The transaction ID.
 */
 setTransactionID(id: string): void {
 this.transactionID = id;
}

/**
 * Returns the current transaction ID.
 * @returns {string | null} The current transaction ID or null if not set.
 */
getTransactionID(): string | null {
 return this.transactionID;
}

/**
 * Fetches bids for a specific item ID.
 * @param {number} itemID - The item ID to fetch bids for.
 * @returns {Observable<Bids[]>} An Observable of the bids for the specified item ID.
 */
getBidsForItem(itemID: number): Observable<Bids[]> {
 console.log('Fetching bids for item ID:', itemID); 
 if (itemID === null || itemID <= 0) {
     return throwError('Invalid item ID');
 }
 const url = `${urls.getBidId}/${itemID}`;
 return this.http.get<Bids[]>(url).pipe(
     catchError(this.handleError)
 );
 }

/**
 * Fetches the current highest bid for a specific item ID.
 * @param {number} itemID - The item ID to fetch the highest bid for.
 * @returns {Observable<number>} An Observable of the current highest bid for the specified item ID.
 */
getCurrentHighestBid(itemID: number): Observable<number> {
 if (itemID === null || itemID <= 0) {
      return throwError('Invalid item ID');
 }

 const url = `${urls.getCurrentHighestBid}/${itemID}`;
 return this.http.get<number>(url).pipe(
      catchError(this.handleError)
 );
}

/**
 * Places a new bid.
 * @param {Bids} bid - The bid to place.
 * @returns {Observable<Bids>} An Observable of the placed bid.
 */
placeBid(bid: Bids): Observable<Bids> {
 return this.http.post<Bids>(urls.placeBid, bid).pipe(
      catchError(this.handleError)
 );
}

/**
 * Returns the current item ID.
 * @returns {Observable<number>} An Observable of the current item ID.
 */
getCurrentItemId(): Observable<number> {
    return this.currentItemId.pipe(
        map(itemID => itemID !== null ? itemID : 0)
    );
}

/**
 * Handles HTTP errors.
 * @param {HttpErrorResponse} error - The error response.
 * @returns {Observable<never>} An Observable that throws an error.
 */
private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
}
}
