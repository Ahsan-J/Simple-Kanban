import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.requestPermission();
  }

  async requestPermission() {
    if (isPlatformBrowser(this.platformId) && 'Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        }
      }
    }
  }

  async sendLocalNotification(title: string, body: string) {
    if (isPlatformBrowser(this.platformId) && 'Notification' in window && Notification.permission === 'granted') {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.showNotification(title, {
          body,
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png',
        });
      } else {
        new Notification(title, { body });
      }
    }
  }
}
