import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCasesComponent } from './components/create-cases/create-cases.component';
import { CreateUsersComponent } from './components/create-users/create-users.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyCasesComponent } from './components/my-cases/my-cases.component';
import { UserCasesComponent } from './components/user-cases/user-cases.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { Role } from './models';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'create-users',
    component: CreateUsersComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] },
  },
  {
    path: 'create-cases',
    component: CreateCasesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.CSO] },
  },
  {
    path: 'my-cases',
    component: MyCasesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.CSO] },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] },
  },
  {
    path: 'user-cases',
    component: UserCasesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.SUPERVISOR] },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
