import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/shared/services/users.service';
import { User } from 'src/shared/models/users-interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
 selector: 'app-users',
 templateUrl: './users.component.html',
 styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
 users: User[] = [];
 selectedUser: User | null = null;
 newUserForm: FormGroup;
 updateUserForm: FormGroup;
 message: string='';

 /**
 * Constructor for UsersComponent.
 * @param {UsersService} usersService - The UsersService for fetching and managing users.
 */
 constructor(private usersService: UsersService,private router:Router) {
   this.newUserForm = new FormGroup({
     username: new FormControl('', Validators.required),
     email: new FormControl('', [Validators.required, Validators.email]),
     passwordHash: new FormControl('', Validators.required)
   });

   this.updateUserForm = new FormGroup({
     userID: new FormControl({value: '', disabled: true}),
     username: new FormControl('', Validators.required),
     email: new FormControl('', [Validators.required, Validators.email]),
     passwordHash: new FormControl('', Validators.required)
   });
 }

 navigateToAdmin()
 {
  this.router.navigate(['/admin']);
 }
 /**
 * Initializes the component by fetching the list of users.
 */
 ngOnInit(): void {
    this.getUsers();
 }

 /**
 * Fetches the list of users from the server.
 */
 getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
 }

 /**
 * Selects a user and populates the update form with the user's details.
 * @param {User} user - The user to select.
 */
 selectUser(user: User): void {
    this.selectedUser = user;
    this.updateUserForm.patchValue(user);
 }

 /**
 * Deletes a user by their ID.
 * @param {number} userID - The ID of the user to delete.
 */
 deleteUser(userID: number): void {
    this.usersService.deleteUser(userID).subscribe(() => {
      this.users = this.users.filter(user => user.userID !== userID);
      this.selectedUser = null;
      this.message = 'User deleted successfully';
      console.log('User deleted successfully');
    }, error => {
      this.message = 'Failed to delete user: ' + error.message;
      console.error('Failed to delete user:', error);
    });
 }
}
