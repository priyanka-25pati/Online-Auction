import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users-interface';
import { urls } from 'src/urls';

@Injectable({
 providedIn: 'root'
})
export class UsersService {

 /**
 * Constructor for UsersService.
 */
 constructor(private http: HttpClient) { }

 /**
 * Fetches all users by sending a GET request to the server.
 * @returns {Observable<User[]>} An Observable of the server's response.
 */
 getUsers(): Observable<User[]> {
    return this.http.get<User[]>(urls.getUser);
 }

 /**
 * Fetches a user by their ID by sending a GET request to the server.
 * @param {number} id - The ID of the user to fetch.
 * @returns {Observable<User>} An Observable of the server's response.
 */
 getUser(id: number): Observable<User> {
    return this.http.get<User>(`${urls.getUserId}/${id}`);
 }

 /**
 * Creates a new user by sending a POST request to the server with the user's information.
 * @param {User} user - The user object containing the user's information.
 * @returns {Observable<User>} An Observable of the server's response.
 */
 createUser(user: User): Observable<User> {
    return this.http.post<User>(urls.createUser, user);
 }

 /**
 * Updates an existing user by sending a PUT request to the server with the user's updated information.
 * @param {number} id - The ID of the user to update.
 * @param {User} user - The user object containing the user's updated information.
 * @returns {Observable<User>} An Observable of the server's response.
 */
 updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${urls.updateUser}/${id}`, user);
 }

 /**
 * Deletes a user by sending a DELETE request to the server.
 * @param {number} id - The ID of the user to delete.
 * @returns {Observable<any>} An Observable of the server's response.
 */
 deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${urls.deleteUser}/${id}`);
 }
}
