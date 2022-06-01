import { Component, OnInit } from '@angular/core';
import { Role } from './models';
import { AuthenticationService } from './services/authentication.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  appMenu: any = [];
  user: any;
  constructor(
    private authenticationService: AuthenticationService,
    public menuService: MenuService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
    this.menuService.menu.subscribe(
      (s) =>
        // console.log(s);
        (this.appMenu = s)
    );
  }
  ngOnInit(): void {}
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
