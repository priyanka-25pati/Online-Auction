import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/shared/services/users.service';
import { User } from 'src/shared/models/users-interface';
import { Router } from '@angular/router';

@Component({
 selector: 'app-user-details',
 templateUrl: './user-details.component.html',
 styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
 user: User | null = null;
 updateForm: FormGroup; 
 updateSuccess: boolean = false; 

 /**
 * Constructor for UserDetailsComponent.
 * @param {UsersService} usersService - The UsersService for fetching and updating user details.
 * @param {FormBuilder} formBuilder - The FormBuilder service for creating forms.
 */
 constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router:Router
 ) {
    this.updateForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required]
    });
 }

 /**
 * Initializes the component by fetching the user details from the server.
 */
 ngOnInit(): void {
    const id = localStorage.getItem('userID');
    if (id !== null) {
      const userID = parseInt(id, 10);
      console.log(userID);
 
      this.usersService.getUser(userID).subscribe(user => {
        this.user = user;
       
        this.updateForm.patchValue({
          email: user.email,
          username: user.username
        });
      }, error => {
        console.error('Failed to fetch user details', error);
     
      });
    } else {
      console.log('User ID not found in local storage');
  
    }
 }
 navigateToItemListing() {
  this.router.navigate(['/auction/item-listing']);
}
 /**
 * Handles the form submission for updating user details.
 */
 onUpdateSubmit() {
 if (this.updateForm.invalid) {
     return;
 }
 
 if (!this.user || typeof this.user.userID === 'undefined') {
     console.error('User ID is not available for update.');
     return;
 }


 const updatedUser: User = {
     userID: this.user.userID, 
     email: this.updateForm.value.email,
     username: this.updateForm.value.username,
     
     passwordHash: this.updateForm.value.passwordHash ? this.updateForm.value.passwordHash : this.user.passwordHash
 };
 
 this.usersService.updateUser(this.user.userID, updatedUser).subscribe({
     next: () => {
       this.updateSuccess = true;
 
       this.user = updatedUser;
     },
     error: (error) => {
       console.error('Failed to update user details', error);
   
     }
 });
 }
 
}
