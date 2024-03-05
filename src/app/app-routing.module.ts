import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthsecGuard } from './security/authsec.guard';
const routes: Routes = [
  {path:'', redirectTo:'auth', pathMatch:'full' },
 { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m =>m.AuthModule) },
 {path:'auction', loadChildren:()=> import ('./auction/auction.module').then(m=>m.AuctionModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
 })
 
export class AppRoutingModule { }
