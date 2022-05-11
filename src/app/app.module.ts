import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CreateUsersComponent } from './components/create-users/create-users.component';
import { UsersComponent } from './components/users/users.component';
import { UserCasesComponent } from './components/user-cases/user-cases.component';
import { CreateCasesComponent } from './components/create-cases/create-cases.component';
import { MyCasesComponent } from './components/my-cases/my-cases.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, CreateUsersComponent, UsersComponent, UserCasesComponent, CreateCasesComponent, MyCasesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot({
      position: ['top', 'right'],
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      maxStack: 2,
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
