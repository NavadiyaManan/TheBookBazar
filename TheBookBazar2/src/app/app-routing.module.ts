import { VariableBinding } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VarifyEmailComponent } from './auth/varify-email/varify-email.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [ 
{path: 'login', component : LoginComponent},
{path: 'register', component : RegisterComponent},
{path: '', component : RegisterComponent},
{path: 'dashboard', component : DashboardComponent},

{path: 'varify-email', component : VarifyEmailComponent},
{path: 'forgot-password', component : ForgotPassComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
