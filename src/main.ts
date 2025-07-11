import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

// Performance monitoring
if (!environment.production) {
  console.log('Performance monitoring enabled in development mode');
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZone: 'zone.js',
  ngZoneEventCoalescing: true,
  ngZoneRunCoalescing: true
})
  .catch(err => console.error(err));
