import { Component } from '@angular/core';
import { Role } from './models';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: any;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  get isCso() {
    return this.user && this.user.role === Role.CSO;
  }
  get isAdmin() {
    return this.user && this.user.role === Role.ADMIN;
  }
  get isSupervisor() {
    return this.user && this.user.role === Role.SUPERVISOR;
  }

  logout() {
    this.authenticationService.logout();
  }
}
