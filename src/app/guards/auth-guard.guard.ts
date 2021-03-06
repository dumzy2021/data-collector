import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const user = this.authenticationService.userValue;
    // console.log(user);
    return this.authenticationService.user.pipe(
      map((user) => {
        if (user) {
          // check if route is restricted by role
          if (
            route.data?.['roles'] &&
            route.data?.['roles'].indexOf(user.role) === -1
          ) {
            // role not authorised so redirect to home page
            this.router.navigate(['/']);
            return false;
          }
          // authorised so return true
          return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
    // if (user) {
    //   // check if route is restricted by role
    //   if (
    //     route.data?.['roles'] &&
    //     route.data?.['roles'].indexOf(user.role) === -1
    //   ) {
    //     // role not authorised so redirect to home page
    //     this.router.navigate(['/']);
    //     return false;
    //   }

    //   // authorised so return true
    //   return true;
    // }

    // // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // return false;
  }
}
