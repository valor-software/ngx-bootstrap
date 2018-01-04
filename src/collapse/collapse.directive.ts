// todo: add animations when https://github.com/angular/angular/issues/9947 solved
import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2 } from '@angular/core';
import { isBs3 } from '../utils';

@Directive({
  selector: '[collapse]',
  exportAs: 'bs-collapse',
  host: {
    '[class.collapse]': 'true'
  }
})
export class CollapseDirective {
  private initialDisplayValue: string;
  /** This event fires as soon as content collapses */
  @Output() collapsed: EventEmitter<any> = new EventEmitter();
  /** This event fires as soon as content becomes visible */
  @Output() expanded: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.display') display: string;

  @HostBinding('attr.aria-expanded')
  isExpanded = true;
  // hidden
  @HostBinding('attr.aria-hidden') isCollapsed = false;
  // stale state
  @HostBinding('class.collapse') isCollapse = true;
  // animation state
  @HostBinding('class.collapsing') isCollapsing = false;

  /** A flag indicating visibility of content (shown or hidden) */
  @Input()
  set collapse(value: boolean) {
    this.isExpanded = value;
    this.toggle();
  }

  get collapse(): boolean {
    return this.isExpanded;
  }

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
  }

  /** allows to manually toggle content visibility */
  toggle(): void {
    if (!this.initialDisplayValue) {
      this.initialDisplayValue = typeof window !== 'undefined' ? getComputedStyle(this._el.nativeElement).display : 'block';
    }

    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  /** allows to manually hide content */
  hide(): void {
    this.isCollapse = false;
    this.isCollapsing = true;

    this.isExpanded = false;
    this.isCollapsed = true;

    this.isCollapse = true;
    this.isCollapsing = false;

    this.display = 'none';
    this._renderer.removeClass(this._el.nativeElement, isBs3() ? 'in' : 'show');
    this.collapsed.emit(this);
  }

  /** allows to manually show collapsed content */
  show(): void {
    this.isCollapse = false;
    this.isCollapsing = true;

    this.isExpanded = true;
    this.isCollapsed = false;

    this.display = this.initialDisplayValue;
    // this.height = 'auto';
    this.isCollapse = true;
    this.isCollapsing = false;
    this._renderer.addClass(this._el.nativeElement, isBs3() ? 'in' : 'show');
    this.expanded.emit(this);
  }
}
