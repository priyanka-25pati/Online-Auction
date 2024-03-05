import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item-interface';
import { urls } from 'src/urls';
import { throwError } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class ItemService {

 constructor(private http: HttpClient) { }

 listItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${urls.list}`, item);
 }

 getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${urls.getItem}`);
 }

 getCategories(): Observable<any> {
    return this.http.get(`${urls.getCategory}`);
 }

 updateItem(item: Item): Observable<Item> {
    if (item.itemID === undefined) {
      console.error('itemId is undefined');
      return throwError('itemId is undefined');
    }
    return this.http.put<Item>(`${urls.update}/${item.itemID}`, item);
 }

 deleteItem(itemID: number): Observable<any> {
    if (itemID === undefined) {
      console.error('itemId is undefined');
      return throwError('itemId is undefined');
    }
    return this.http.delete(`${urls.delete}/${itemID}`);
 }

 // Method to get an item by its ID
 getItemById(itemID: number): Observable<Item> {
    if (itemID === undefined) {
      console.error('itemId is undefined');
      return throwError('itemId is undefined');
    }
    return this.http.get<Item>(`${urls.getItem}/${itemID}`);
 }
}
