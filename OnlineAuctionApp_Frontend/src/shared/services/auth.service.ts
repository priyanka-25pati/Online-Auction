import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/auth-interface';
import { LoginCredentials } from '../models/authCredentials-interface';
import { urls } from 'src/urls';
import { AuthResponse } from '../models/authResponse-interface'; 
import { Router } from '@angular/router';

@Injectable({
 providedIn: 'root'
})
export class AuthService {
 constructor(private http: HttpClient, private router: Router) { }

 /**
 * Registers a new user by sending a POST request to the server with the user's information.
 * @param {User} user - The user object containing the user's registration information.
 * @returns {Observable<AuthResponse>} An Observable of the server's response.
 */
 registerUser(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${urls.register}`, user, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
 }

 /**
 * Authenticates a user by sending a POST request to the server with the user's login credentials.
 * @param {LoginCredentials} credentials - The user's login credentials.
 * @returns {Observable<AuthResponse>} An Observable of the server's response.
 */
 loginUser(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${urls.login}/authenticate`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap(response => {
        if (response.user) {
          console.log('User ID:', response.user.userID);
        }
      })
    );
 }

 /**
 * Logs out the current user by removing the authentication token from local storage and navigating to the login page.
 */
 logout(): void {
    localStorage.removeItem('Authtoken');
    this.router.navigate(['/login']);
 }
}
