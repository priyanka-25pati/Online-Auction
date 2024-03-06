import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { User } from 'src/shared/models/auth-interface';
import { AuthResponse } from 'src/shared/models/authResponse-interface'; 
import { Router } from '@angular/router'; 
import { AuthGuardService } from 'src/shared/services/authguard.service'; 

@Component({
 selector: 'app-register',
 templateUrl: './register.component.html',
 styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 registerForm: FormGroup = new FormGroup({});

 /**
 * Constructor for RegisterComponent.
 * @param {FormBuilder} formBuilder - The FormBuilder service.
 * @param {AuthService} authService - The AuthService for user registration.
 * @param {Router} router - The Router service for navigation.
 * @param {AuthGuardService} authGuardService - The AuthGuardService for authentication state management.
 */
 constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private authGuardService: AuthGuardService 
 ) { }

 /**
 * Initializes the registration form.
 */
 ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required]
    });
 }

 /**
 * Handles the form submission.
 */
 onSubmit() {
 if (this.registerForm.invalid) {
     return;
 }
 
 const user: User = this.registerForm.value;
 this.authService.registerUser(user).subscribe({
     next: (response: AuthResponse) => {
       console.log('Registration successful', response);
     
       localStorage.setItem('Authtoken', response.token);
      
       this.authGuardService.setAuthenticated(true); 
     
       
       const userID = response.user.userID;
       console.log('User ID:', userID);
       localStorage.setItem('userID', userID.toString());
       
       this.router.navigate(['/auction/item-listing']); 
     },
     error: (error) => {
       console.error('Registration failed', error);
    
     },
     complete: () => {
       console.log('Registration process completed');
     }
 });
 }
}
