// todo: add animations when https://github.com/angular/angular/issues/9947 solved
import {
  Directive, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output,
  Renderer, style
} from '@angular/core';

@Directive({
  selector: '[collapse]',
  exportAs: 'bs-collapse',
  /* tslint:disable-next-line */
  host: {'[class.collapse]': 'true'}/*,
  animations: [
    trigger('active', [
      state('void', style({height: 0})),
      state('closed', style({height: 0})),
      state('open', style({height: '*'})),
      transition('void => closed', [animate(0)]),
      transition('closed => open', [animate('350ms ease-out')]),
      transition('open => closed', [animate('350ms ease-out')])
    ])
  ]*/
})
export class CollapseDirective {
  /** This event fires as soon as content collapses */
  @Output() public collapsed: EventEmitter<any> = new EventEmitter();
  /** This event fires as soon as content becomes visible */
  @Output() public expanded: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.display')
  public display: string;
  // shown
  @HostBinding('class.in')
  @HostBinding('class.show')
  @HostBinding('attr.aria-expanded')
  public isExpanded: boolean = true;
  // hidden
  @HostBinding('attr.aria-hidden')
  public isCollapsed: boolean = false;
  // stale state
  @HostBinding('class.collapse')
  public isCollapse: boolean = true;
  // animation state
  @HostBinding('class.collapsing')
  public isCollapsing: boolean = false;

  /** A flag indicating visibility of content (shown or hidden) */
  @Input()
  public set collapse(value: boolean) {
    this.isExpanded = value;
    this.toggle();
  }

  public get collapse(): boolean {
    return this.isExpanded;
  }

  protected _el: ElementRef;
  protected _renderer: Renderer;

  public constructor(_el: ElementRef, _renderer: Renderer) {
    this._el = _el;
    this._renderer = _renderer;
  }

  /** allows to manually toggle content visibility */
  public toggle(): void {
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  /** allows to manually hide content */
  public hide(): void {
    this.isCollapse = false;
    this.isCollapsing = true;

    this.isExpanded = false;
    this.isCollapsed = true;

    this.isCollapse = true;
    this.isCollapsing = false;

    this.display = 'none';
    this.collapsed.emit(this);
  }

  /** allows to manually show collapsed content */
  public show(): void {
    this.isCollapse = false;
    this.isCollapsing = true;

    this.isExpanded = true;
    this.isCollapsed = false;

    this.display = 'block';
    // this.height = 'auto';
    this.isCollapse = true;
    this.isCollapsing = false;
    this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
    this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
    this.expanded.emit(this);
  }
}
