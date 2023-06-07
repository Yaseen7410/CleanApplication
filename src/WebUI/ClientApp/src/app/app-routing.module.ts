import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { Roles } from './SoftMash-Api';
import { SalaryComponent } from './salary/salary.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registeredUsers', component: RegisteredUsersComponent, canActivate: [AuthGuard] },
  { path: 'verifyEmail/:id', component: VerifyEmailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:id', component: RegisterComponent },
  {
    path: 'employeelist',
    component: EmployeelistComponent,
    canActivate: [AuthGuard],
  },
  { path: 'employee-info', component: EmployeeInfoComponent },
  { path: 'salary', component: SalaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
