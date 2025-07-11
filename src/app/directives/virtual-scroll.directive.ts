import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appVirtualScroll]'
})
export class VirtualScrollDirective implements OnInit, OnDestroy {
  @Input() itemHeight = 50;
  @Input() buffer = 5;
  
  private container: HTMLElement;
  private items: any[] = [];
  private visibleItems: any[] = [];
  private scrollTop = 0;
  private containerHeight = 0;
  private totalHeight = 0;
  private startIndex = 0;
  private endIndex = 0;
  private scrollListener!: () => void;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.container = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.setupVirtualScroll();
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      this.container.removeEventListener('scroll', this.scrollListener);
    }
  }

  @Input() set virtualItems(items: any[]) {
    this.items = items || [];
    this.updateVirtualScroll();
  }

  private setupVirtualScroll() {
    this.containerHeight = this.container.clientHeight;
    this.totalHeight = this.items.length * this.itemHeight;
    
    this.renderer.setStyle(this.container, 'position', 'relative');
    this.renderer.setStyle(this.container, 'overflow', 'auto');
    
    // Create a spacer element to maintain scroll height
    const spacer = this.renderer.createElement('div');
    this.renderer.setStyle(spacer, 'height', `${this.totalHeight}px`);
    this.renderer.setStyle(spacer, 'position', 'absolute');
    this.renderer.setStyle(spacer, 'top', '0');
    this.renderer.setStyle(spacer, 'left', '0');
    this.renderer.setStyle(spacer, 'right', '0');
    this.renderer.setStyle(spacer, 'pointer-events', 'none');
    this.renderer.appendChild(this.container, spacer);

    this.scrollListener = () => {
      this.onScroll();
    };
    
    this.container.addEventListener('scroll', this.scrollListener);
    this.updateVirtualScroll();
  }

  private onScroll() {
    this.scrollTop = this.container.scrollTop;
    this.updateVirtualScroll();
  }

  private updateVirtualScroll() {
    if (!this.items.length) return;

    this.startIndex = Math.floor(this.scrollTop / this.itemHeight);
    this.endIndex = Math.min(
      this.startIndex + Math.ceil(this.containerHeight / this.itemHeight) + this.buffer,
      this.items.length
    );

    this.startIndex = Math.max(0, this.startIndex - this.buffer);

    this.visibleItems = this.items.slice(this.startIndex, this.endIndex);
    
    // Update the spacer position
    const spacer = this.container.querySelector('div');
    if (spacer) {
      this.renderer.setStyle(spacer, 'transform', `translateY(${this.startIndex * this.itemHeight}px)`);
    }
  }

  getVisibleItems(): any[] {
    return this.visibleItems;
  }

  getVisibleRange(): { start: number; end: number } {
    return { start: this.startIndex, end: this.endIndex };
  }
} 