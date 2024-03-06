import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class AuthGuardService {

 /**
 * Indicates whether the user is authenticated.
 */
 isAuthenticated = false;

 /**
 * Constructor for AuthGuardService.
 */
 constructor() {}

 /**
 * Sets the authentication status to true, indicating the user is logged in.
 */
 login(): void {
    this.isAuthenticated = true;
 }

 /**
 * Sets the authentication status to false, indicating the user is logged out.
 */
 logout(): void {
    this.isAuthenticated = false;
 }

 /**
 * Sets the authentication status based on the provided boolean value.
 * @param {boolean} isAuthenticated - The new authentication status.
 */
 setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
 }
}
