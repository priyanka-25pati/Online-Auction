import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users-interface';
import { urls } from 'src/urls';
@Injectable({
 providedIn: 'root'
})
export class UsersService {


 constructor(private http: HttpClient) { }

 // Method to get all users
 getUsers(): Observable<User[]> {
    return this.http.get<User[]>(urls.getUser);
 }

 // Method to get a single user by ID
 getUser(id: number): Observable<User> {
    return this.http.get<User>(`${urls.getUserId}/${id}`);
 }

 // Method to create a new user
 createUser(user: User): Observable<User> {
    return this.http.post<User>(urls.createUser, user);
 }

 // Method to update an existing user
 updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${urls.updateUser}/${id}`, user);
 }

 // Method to delete a user
 deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${urls.deleteUser}/${id}`);
 }
}
