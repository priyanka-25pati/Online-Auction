import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/auth-interface';
import { LoginCredentials } from '../models/authCredentials-interface';
import { urls } from 'src/urls';
import { AuthResponse } from '../models/authResponse-interface'; // Import the AuthResponse interface
import { Router } from '@angular/router';

@Injectable({
 providedIn: 'root'
})
export class AuthService {
 constructor(private http: HttpClient,private router: Router) { }

 // Method to register a new user
 registerUser(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${urls.register}`, user, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
 }

 loginUser(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${urls.login}/authenticate`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap(response => {
        if (response.user) {
          console.log('User ID:', response.user.userID);
          // You can now use response.user.userID as needed
        }
        // Handle the admin case similarly if needed
      })
    );
}
logout(): void {
    // Clear the authentication token from local storage
    localStorage.removeItem('Authtoken');
    // Optionally, clear other user-related data from local storage

    // Redirect the user to the login page
    this.router.navigate(['/login']);
 }

}
