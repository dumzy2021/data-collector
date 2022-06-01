import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StartupService } from '../core';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private menuService: MenuService,
    private startupService: StartupService
  ) {
    this.userSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('dc_user_details')!)
    );
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): any {
    return this.userSubject.value;
  }
  login(username: string, password: string) {
    return this.http
      .get<any>(
        `${
          environment.apiUrl
        }/users?username=${username.trim()}&password=${password.trim()}`
      )
      .pipe(
        map((user) => {
          if (!user.length) {
            console.log(user);
          } else {
            const { password, username, ...userData } = user[0];
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('dc_user_details', JSON.stringify(userData));
            console.log('call load');
            this.startupService.load();
            this.userSubject.next(userData);
          }
          return user;
        })
      );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('dc_user_details');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
    this.menuService.clearMenu();
  }
}
