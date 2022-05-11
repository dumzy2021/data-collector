import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  getStatus(status: number) {
    if (status === 0) {
      return 'pending';
    } else if (status === 1) {
      return 'approved';
    }
    return 'revoked';
  }
}
