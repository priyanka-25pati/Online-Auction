import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthsecGuard } from '../security/authsec.guard';
const routes: Routes = [{ path: '', component: AdminComponent ,canActivate: [AuthsecGuard]}, 
{ path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),canActivate: [AuthsecGuard] }, 
{ path: 'listings', loadChildren: () => import('./listings/listings.module').then(m => m.ListingsModule) ,canActivate: [AuthsecGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
