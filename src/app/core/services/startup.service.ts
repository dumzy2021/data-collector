import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService } from 'src/app/services/menu.service';

@Injectable()
export class StartupService {
  constructor(
    private httpClient: HttpClient,
    private menuService: MenuService
  ) {}
  load(): Promise<void> {
    let user = JSON.parse(localStorage.getItem('dc_user_details')!);
    this.menuService.clearMenu();
    let menuName =
      user?.role === 'CSO'
        ? 'app-menu-cso'
        : user?.role === 'SUPERVISOR'
        ? 'app-menu-supervisor'
        : 'app-menu';
    return new Promise((resolve) => {
      zip(this.httpClient.get(`assets/menu/${menuName}.json`))
        .pipe(
          catchError((res) => {
            resolve();
            return [];
          })
        )
        .subscribe({
          next: ([{ menu }]: any) => {
            this.menuService.setMenu(menu);
          },
          error: () => {},
          complete: () => {
            resolve();
          },
        });
    });
  }
}
