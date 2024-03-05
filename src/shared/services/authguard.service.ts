// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class AuthGuardService {
 // This is a simple example. In a real application, you would likely have more complex logic here.
 isAuthenticated = false;

 constructor() {}

 login() {
    this.isAuthenticated = true;
 }

 logout() {
    this.isAuthenticated = false;
 }
 setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
 }
}
