import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import tap operator
import { Item } from '../models/item-interface';
import { urls } from 'src/urls';

@Injectable({
 providedIn: 'root'
})
export class ItemService {

 constructor(private http: HttpClient) { }

 /**
 * Lists a new item by sending a POST request to the server with the item's information.
 * @param {Item} item - The item object containing the item's information.
 * @returns {Observable<Item>} An Observable of the server's response.
 */
 listItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${urls.list}`, item);
 }

 /**
 * Fetches all items by sending a GET request to the server.
 * @returns {Observable<Item[]>} An Observable of the server's response.
 */
 getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${urls.getItem}`);
 }

 /**
 * Fetches all categories by sending a GET request to the server.
 * @returns {Observable<any>} An Observable of the server's response.
 */
 getCategories(): Observable<any> {
    return this.http.get(`${urls.getCategory}`);
 }

 /**
 * Updates an existing item by sending a PUT request to the server with the item's updated information.
 * @param {Item} item - The item object containing the item's updated information.
 * @returns {Observable<Item>} An Observable of the server's response.
 */
 updateItem(item: Item): Observable<Item> {
    if (item.itemID === undefined) {
      console.error('itemId is undefined');
      return throwError('itemId is undefined');
    }
    return this.http.put<Item>(`${urls.update}/${item.itemID}`, item);
 }

 /**
 * Deletes an item by sending a DELETE request to the server.
 * @param {number} itemID - The ID of the item to delete.
 * @returns {Observable<any>} An Observable of the server's response.
 */
 deleteItem(itemID: number): Observable<any> {
    if (itemID === undefined) {
      console.error('itemId is undefined');
      return throwError('itemId is undefined');
    }
    return this.http.delete(`${urls.delete}/${itemID}`);
 }

 /**
 * Fetches an item by its ID by sending a GET request to the server.
 * @param {number} itemID - The ID of the item to fetch.
 * @returns {Observable<Item>} An Observable of the server's response.
 */
 getItemById(itemID: number): Observable<Item> {
    if (itemID === undefined) {
      console.error('itemId is undefined');
      return throwError('itemId is undefined');
    }
    return this.http.get<Item>(`${urls.getItem}/${itemID}`).pipe(
      tap(item => {
        if (item) {
          console.log('Fetched item ID:', item.itemID);
        }
      })
    );
 }
}
