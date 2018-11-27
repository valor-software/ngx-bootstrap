import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input, OnInit,
  Output,
  Renderer2
} from '@angular/core';
import Timer = NodeJS.Timer;

@Directive({
  selector: '[collapse]',
  exportAs: 'bs-collapse'
})
export class CollapseDirective implements OnInit {
  /** enable animated toggle */
  @Input()
  animate: boolean | undefined;

  /** This event fires as soon as content collapses and animation has finished */
  @Output() collapsed: EventEmitter<CollapseDirective> = new EventEmitter();
  /** This event fires when collapsing is started */
  @Output() collapses: EventEmitter<CollapseDirective> = new EventEmitter();
  /** This event fires as soon as content becomes visible and animation has finished */
  @Output() expanded: EventEmitter<CollapseDirective> = new EventEmitter();
  /** This event fires when expansion is started */
  @Output() expands: EventEmitter<CollapseDirective> = new EventEmitter();

  /** Html accessibility property aria-expanded */
  @HostBinding('attr.aria-expanded') isExpanded = true;
  /** Html accessibility property aria-hidden */
  @HostBinding('attr.aria-hidden') isHidden = false;

  private _timeout: Timer|undefined = undefined;

  /** A flag indicating visibility of content (shown or hidden) */
  @Input()
  set collapse(value: boolean) {
    this.isExpanded = value;
    this._initComplete ? this.toggle() : this._togglePreInit();
  }

  get collapse(): boolean {
    return this.isExpanded;
  }

  private _initComplete = false;

  constructor(private _el: ElementRef<HTMLElement>, private _renderer: Renderer2) {
  }

  ngOnInit() {
    this._setClasses('collapse');
    if (this.isExpanded) {
      this._setClasses('show');
    }
    this._initComplete = true;
  }

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
    if (!this.isExpanded) {
      return;
    }
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this.collapses.emit(this);

    if (this.animate) {
      // set old dimension value as to not lose it on class change
      const dimension = this._getDimension();
      const dimensionValue = window.getComputedStyle(this._el.nativeElement)[dimension];
      this._renderer.setStyle(this._el.nativeElement, dimension, dimensionValue);

      // toggle bootstrap classes and properties
      this.isExpanded = false;
      this.isHidden = true;
      this._setClasses('collapsing', ['collapse', 'show']);

      // remove previously set dimension value to start transition
      const duration = this._getDuration();
      this._renderer.removeStyle(this._el.nativeElement, dimension);

      // on transition finish, toggle bootstrap classes and emit finished
      this._timeout = setTimeout(() => {
        this._timeout = undefined;
        this._setClasses('collapse', 'collapsing');
        this.collapsed.emit(this);
      }, duration);
    } else {
      this.isExpanded = false;
      this.isHidden = true;
      this._setClasses([], 'show');
      this.collapsed.emit(this);
    }
  }


  /** allows to manually show collapsed content */
  show(): void {
    if (this.isExpanded) {
      return;
    }
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this.expands.emit(this);

    // toggle bootstrap classes and properties
    this.isExpanded = true;
    this.isHidden = false;
    const dimension = this._getDimension();
    if (this.animate) {
      this._setClasses('collapsing', 'collapse');

      // set new height or width to scale to
      const scrollDimension = `scroll${dimension.charAt(0).toUpperCase()}${dimension.substring(1)}`;
      const dimensionValue = `${this._el.nativeElement[scrollDimension]}px`;
      this._renderer.setStyle(this._el.nativeElement, dimension, dimensionValue);
      const duration = this._getDuration();

      // on transition finish, toggle bootstrap classes and emit finished
      this._timeout = setTimeout(() => {
        this._timeout = undefined;
        this._renderer.removeStyle(this._el.nativeElement, dimension);
        this._setClasses(['collapse', 'show'], 'collapsing');
        this.expanded.emit(this);
      }, duration);
    } else {
      this._renderer.removeStyle(this._el.nativeElement, dimension);
      this._setClasses(['collapse', 'show'], 'collapsing');
      this.expanded.emit(this);
    }
  }

  /**
   * Toggle css classes via renderer, because @HostListener would introduce rendering
   * cycles and timeouts or listeners for state change would be necessary.
   */
  private _setClasses(add: string[] | string, remove: string[] | string = []): void {
    (Array.isArray(remove) ? remove : [remove])
      .forEach(c => this._renderer.removeClass(this._el.nativeElement, c));
    (Array.isArray(add) ? add : [add])
      .forEach(c => this._renderer.addClass(this._el.nativeElement, c));
  }


  /** Determine if height or width should be transitioned */
  private _getDimension(): string {
    return this._el.nativeElement.classList.contains('width') ? 'width' : 'height';
  }

  /**
   * Detect the duration of the transition based on duration and delay css values.
   * @return animation duration in ms
   */
  private _getDuration(): number {
    const calculateDuration = (duration: string): number => {
      // take first value (if multiple specified)
      const firstDuration = duration.split(',')[0].trim();
      // detect if value has unit seconds or milliseconds
      if (firstDuration.endsWith('ms')) {
        return parseFloat(firstDuration.substr(0, firstDuration.length - 2));
      } else if (firstDuration.endsWith('s')) {
        return parseFloat(firstDuration.substr(0, firstDuration.length - 1)) * 1000;
      }

      return 0;
    };

    const cssState = window.getComputedStyle(this._el.nativeElement);

    return calculateDuration(cssState.transitionDuration) +
      calculateDuration(cssState.transitionDelay);
  }

  /** Toggle the expanded state, but skip the animation part */
  private _togglePreInit() {
    this.isExpanded = !this.isExpanded;
    this.isHidden = !this.isExpanded;
  }
}
