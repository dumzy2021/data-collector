import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notify: NotificationsService) {}

  showSuceess(content: string) {
    this.notify.success('', content);
  }
  showError(content: string) {
    this.notify.error('', content);
  }
  showInfo(content: string) {
    this.notify.info('', content);
  }
  showWarning(content: string) {
    this.notify.warn('', content);
  }
}
