import {
  AnimationBuilder
} from '@angular/animations';

import { fadeIn, fadeOut, slideIn, slideOut } from 'ngx-bootstrap/utils';

// todo: add animations when https://github.com/angular/angular/issues/9947 solved
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[collapse]',
  exportAs: 'bs-collapse',
  host: {
    '[class.collapse]': 'true'
  }
})
export class CollapseDirective {
  /** This event fires as soon as content collapses */
  /* tslint:disable-next-line: no-any */
  @Output() collapsed: EventEmitter<any> = new EventEmitter();
  /** This event fires as soon as content becomes visible */
  /* tslint:disable-next-line: no-any */
  @Output() expanded: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.display') display: string;
  // shown
  @HostBinding('class.in')
  @HostBinding('class.show')
  @HostBinding('attr.aria-expanded')
  isExpanded = true;
  // hidden
  @HostBinding('attr.aria-hidden') isCollapsed = false;
  // stale state
  @HostBinding('class.collapse') isCollapse = true;
  // animation state
  @HostBinding('class.collapsing') isCollapsing = false;

  @Input() animated = false;
  @Input() animationType: 'fade' | 'slide' = 'fade';

  /** A flag indicating visibility of content (shown or hidden) */
  @Input()
  set collapse(value: boolean) {
    if (!this.animated) {
      this.isExpanded = value;
      this.toggle();
    } else {
      if (this.animationType === 'fade') {
        const metadata = value ? fadeOut : fadeIn;

        const factory = this.builder.build(metadata);
        const player = factory.create(this._el.nativeElement);

        player.play();
        player.onDone(() => {
          this.isExpanded = value;
          this.toggle();
        });
      } else if (this.animationType === 'slide') {
        const metadata = value ? slideIn : slideOut;
        const factory = this.builder.build(metadata);
        const player = factory.create(this._el.nativeElement);

        player.play();
      }

    }
  }

  get collapse(): boolean {
    return this.isExpanded;
  }

  constructor(private _el: ElementRef, private _renderer: Renderer2, private builder: AnimationBuilder) {}

  /** allows to manually toggle content visibility */
  toggle(): void {
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  /** allows to manually hide content */
  hide(): void {
    this.isExpanded = false;
    this.isCollapsed = true;

    this.isCollapse = true;
    this.isCollapsing = false;

    this.display = 'none';
    this.collapsed.emit(this);
  }

  /** allows to manually show collapsed content */
  show(): void {
    this.isExpanded = true;
    this.isCollapsed = false;

    this.display = 'block';
    // this.height = 'auto';
    this.isCollapse = true;
    this.isCollapsing = false;
    this._renderer.setStyle(
      this._el.nativeElement,
      'overflow',
      'visible'
    );
    this._renderer.setStyle(this._el.nativeElement, 'height', 'auto');
    this.expanded.emit(this);
  }

}
