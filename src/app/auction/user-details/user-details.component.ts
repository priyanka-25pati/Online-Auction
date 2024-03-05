import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/shared/services/users.service';
import { User } from 'src/shared/models/users-interface';

@Component({
 selector: 'app-user-details',
 templateUrl: './user-details.component.html',
 styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
 user: User | null = null;

 constructor(private usersService: UsersService) {}

 ngOnInit(): void {
    const id = localStorage.getItem('userID');
    if (id !== null) {
      const userID = parseInt(id, 10);
      console.log(userID);
      // Fetch user details based on userID
      this.usersService.getUser(userID).subscribe(user => {
        this.user = user;
      }, error => {
        console.error('Failed to fetch user details', error);
        // Handle the error appropriately
      });
    } else {
      console.log('User ID not found in local storage');
      // Handle the case where userID is not found in local storage
      // This could involve setting a default value, showing an error message, etc.
    }
 }
}
