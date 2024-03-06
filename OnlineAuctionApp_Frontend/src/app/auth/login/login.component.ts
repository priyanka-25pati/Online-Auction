import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { Router } from '@angular/router'; 
import { LoginCredentials } from 'src/shared/models/authCredentials-interface';
import { AuthResponse } from 'src/shared/models/authResponse-interface'; 
import { AuthGuardService } from 'src/shared/services/authguard.service'; 

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup;
 loginFailed: boolean = false; // Track login attempt status

 /**
 * Constructor for LoginComponent.
 * @param {FormBuilder} formBuilder - The FormBuilder service.
 * @param {AuthService} authService - The AuthService for user authentication.
 * @param {Router} router - The Router service for navigation.
 * @param {AuthGuardService} authGuardService - The AuthGuardService for authentication state management.
 */
 constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuardService: AuthGuardService
 ) {
 this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
 });
 }

 /**
 * Initializes the login form.
 */
 ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
 }

 /**
 * Handles the form submission for user login.
 */
 onSubmit() {

 if (this.loginForm.invalid) {
         return;
 }
 
 
 const credentials: LoginCredentials = this.loginForm.value;
 console.log('Form values:', credentials);
 this.authService.loginUser(credentials).subscribe({
     next: (response: AuthResponse) => {
       console.log('Login successful', response);
       // Set the authentication state to true upon successful login
       this.authGuardService.setAuthenticated(true);
       localStorage.setItem('Authtoken', response.token);
       console.log(response.user);
       console.log(response.admin);

       if (response.user) {
         
         const userID = response.user.userID;
         console.log('User ID:', userID);
         localStorage.setItem('userID', userID.toString());
         this.router.navigate(['/auction/item-listing']);
       } else if (response.admin) {
         // If the credentials match an admin, navigate to AdminModule
         this.router.navigate(['/admin']);
       } else {
         // Fallback: If neither a user nor an admin is found, log a message and redirect to RegisterComponent
         console.log('Login successful, but no user or admin information found. Redirecting to registration.');
         this.router.navigate(['/register']); // Redirect to the register component
       }
     },
     error: (error) => {
       console.error('Login failed', error);
       console.log("asdhere2");
       
       this.router.navigate(['/register']); 
     }
 });
 }
 
}
