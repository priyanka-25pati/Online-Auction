import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { User } from 'src/shared/models/auth-interface';
import { AuthResponse } from 'src/shared/models/authResponse-interface'; 
import { Router } from '@angular/router'; 
import { AuthGuardService } from 'src/shared/services/authguard.service'; // Ensure this import is correct

@Component({
 selector: 'app-register',
 templateUrl: './register.component.html',
 styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 registerForm: FormGroup = new FormGroup({});

 constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private authGuardService: AuthGuardService // Inject AuthGuardService
 ) { }

 ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required]
    });
 }

 onSubmit() {
 if (this.registerForm.invalid) {
     return;
 }
 
 const user: User = this.registerForm.value;
 this.authService.registerUser(user).subscribe({
     next: (response: AuthResponse) => {
       console.log('Registration successful', response);
       // Store the token in local storage
       localStorage.setItem('Authtoken', response.token);
       // Update the authentication state to reflect that the user is now authenticated
       this.authGuardService.setAuthenticated(true); // Assuming AuthGuardService has a setAuthenticated method
       // Navigate the user to the protected route
       this.router.navigate(['/auction/item-listing']); 
     },
     error: (error) => {
       console.error('Registration failed', error);
       // Handle registration failure, e.g., show a message to the user
     },
     complete: () => {
       console.log('Registration process completed');
     }
 });
 }
}
