import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwRegistrationService {

  constructor() { }

  async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator && environment.production) {
      try {
        const registration = await navigator.serviceWorker.register('/ngsw-worker.js');
        console.log('Service Worker registered successfully:', registration);
        
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New version available');
              }
            });
          }
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  async checkForUpdate(): Promise<void> {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
      }
    }
  }

  async unregisterServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
        console.log('Service Worker unregistered');
      }
    }
  }
} 