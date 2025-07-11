import { Component, OnInit, HostListener } from '@angular/core';
import { PerformanceMonitorService } from './services/performance-monitor.service';
import { SwRegistrationService } from './services/sw-registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ng_portfolio';

  constructor(
    private performanceMonitor: PerformanceMonitorService,
    private swRegistration: SwRegistrationService
  ) {}

  ngOnInit() {
    this.performanceMonitor.startTimer('app_init');
    this.initializeApp();
  }

  private async initializeApp() {
    try {
      // Register service worker for offline capabilities
      await this.swRegistration.registerServiceWorker();
      
      // Measure initial load performance
      this.performanceMonitor.endTimer('app_init');
      this.performanceMonitor.measureMemoryUsage();
      this.performanceMonitor.measurePaintTime();
    } catch (error) {
      console.error('App initialization error:', error);
    }
  }

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    // Log final performance metrics
    const report = this.performanceMonitor.getPerformanceReport();
    console.log('Final Performance Report:', report);
  }
}
