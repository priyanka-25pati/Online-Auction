import { Component } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  
 constructor(private authService: AuthService, private router: Router) {}
  userDetails()
  {

  }

  listings()
  {
    
  }
  logout() {
    this.authService.logout();
 }

}
