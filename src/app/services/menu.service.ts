import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public menu: Observable<any> = this.menuSubject.asObservable();
  constructor() {}
  getMenu() {
    return this.menu;
  }
  setMenu(menuType: any) {
    console.log('Inside Menu Service', menuType);
    this.menuSubject.next(menuType);
  }
  clearMenu() {
    this.menuSubject.next([]);
  }
}
