import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthsecGuard } from '../security/authsec.guard';
const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full' },
 { path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent,canActivate: [AuthsecGuard] }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class AuthRoutingModule { }
