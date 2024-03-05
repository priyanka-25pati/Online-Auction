import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/shared/services/users.service';
import { User } from 'src/shared/models/users-interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

 constructor(private usersService: UsersService) {
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

 ngOnInit(): void {
    this.getUsers();
 }

 getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
 }

 selectUser(user: User): void {
    this.selectedUser = user;
    this.updateUserForm.patchValue(user);
 }

//  createUser(): void {
//     if (this.newUserForm.valid) {
//       const newUser = this.newUserForm.value;
//       this.usersService.createUser(newUser).subscribe(user => {
//         this.users.push(user);
//         this.newUserForm.reset();
//         this.message = 'User created successfully';
//         console.log('User created successfully');
//       }, error => {
//         this.message = 'Failed to create user: ' + error.message;
//         console.error('Failed to create user:', error);
//       });
//     }
//  }

 updateUser(): void {
    if (this.selectedUser && this.updateUserForm.valid) {
      const updatedUser = { ...this.selectedUser, ...this.updateUserForm.value };
      this.usersService.updateUser(updatedUser.userID, updatedUser).subscribe(() => {
        const index = this.users.findIndex(u => u.userID === updatedUser.userID);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.selectedUser = null;
        this.message = 'User updated successfully';
        console.log('User updated successfully');
      }, error => {
        this.message = 'Failed to update user: ' + error.message;
        console.error('Failed to update user:', error);
      });
    }
 }

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
