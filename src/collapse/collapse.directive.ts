import {
  AfterViewChecked,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  Renderer2,
  effect,
  input,
  output
} from '@angular/core';

import { onTransitionFinished, TransitionFinishedRef } from 'ngx-bootstrap/utils';

import { COLLAPSE_ANIMATION_DURATION_MS, COLLAPSE_ANIMATION_TIMING } from './collapse-animations';

@Directive({
    selector: '[collapse]',
    exportAs: 'bs-collapse',
    host: {
        '[class.collapse]': 'true'
    },
    standalone: true
})
export class CollapseDirective implements AfterViewChecked, OnDestroy {
  /** This event fires as soon as content collapses */
  collapsed = output<CollapseDirective>();
  /** This event fires when collapsing is started */
  collapses = output<CollapseDirective>();
  /** This event fires as soon as content becomes visible */
  expanded = output<CollapseDirective>();
  /** This event fires when expansion is started */
  expands = output<CollapseDirective>();
  // shown
  @HostBinding('class.in')
  @HostBinding('class.show')

  isExpanded = true;
  collapseNewValue = true;
  // hidden
  @HostBinding('attr.aria-hidden') isCollapsed = false;
  // stale state
  @HostBinding('class.collapse') isCollapse = true;
  // animation state
  @HostBinding('class.collapsing') isCollapsing = false;

  display = input<string>('block');

  /** turn on/off animation */
  isAnimated = input<boolean>(false);
  /** A flag indicating visibility of content (shown or hidden) */
  collapse = input<boolean>(false);

  private _display = 'block';
  private _isAnimationDone?: boolean;
  private _stylesLoaded = false;
  private _isTransitionRunning = false;
  private _pendingFinish?: TransitionFinishedRef;
  private _rafId?: number;

  private _COLLAPSE_ACTION_NAME = 'collapse';
  private _EXPAND_ACTION_NAME = 'expand';

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
    // Watch for display changes
    effect(() => {
      const displayValue = this.display();
      this._display = displayValue;
      if (displayValue === 'none') {
        this.hide();
        return;
      }
      this.isAnimated() ? this.toggle() : this.show();
    });

    // Watch for collapse changes
    effect(() => {
      const collapseValue = this.collapse();
      this.collapseNewValue = collapseValue;
      if (!this._isTransitionRunning || this._isAnimationDone) {
        this.isExpanded = collapseValue;
        this.toggle();
      }
    });
  }

  ngAfterViewChecked(): void {
    this._stylesLoaded = true;
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
    this.isCollapsing = true;
    this.isExpanded = false;
    this.isCollapsed = true;
    this.isCollapsing = false;

    this.collapses.emit(this);

    this._isAnimationDone = false;

    this.animationRun(this.isAnimated(), this._COLLAPSE_ACTION_NAME)(() => {
      this._isAnimationDone = true;
      if (this.collapseNewValue !== this.isCollapsed && this.isAnimated()) {
        this.show();
        return;
      }
      this.collapsed.emit(this);
      this._renderer.setStyle(this._el.nativeElement, 'display', 'none');
    });
  }

  /** allows to manually show collapsed content */
  show(): void {
    this._renderer.setStyle(this._el.nativeElement, 'display', this._display);

    this.isCollapsing = true;
    this.isExpanded = true;
    this.isCollapsed = false;
    this.isCollapsing = false;

    this.expands.emit(this);

    this._isAnimationDone = false;
    this.animationRun(this.isAnimated(), this._EXPAND_ACTION_NAME)(() => {
      this._isAnimationDone = true;
      if (this.collapseNewValue !== this.isCollapsed && this.isAnimated()) {
        this.hide();
        return;
      }
      this.expanded.emit(this);
    });
  }

  animationRun(isAnimated: boolean, action: string): (callback: () => void) => void {
    if (!isAnimated || !this._stylesLoaded) {
      return (callback: () => void) => callback();
    }

    const el = this._el.nativeElement as HTMLElement;
    const isExpand = action === this._EXPAND_ACTION_NAME;
    // True when a CSS transition is already mid-flight; we can reverse it by
    // snapshotting the current rendered height and flipping the target.
    const wasRunning = !!this._pendingFinish;

    this._cancelPending();

    // Ensure the element is visible before measuring scrollHeight — Bootstrap's
    // .collapse:not(.show) { display:none } can win over a missing inline style.
    this._renderer.setStyle(el, 'display', this._display);
    this._renderer.setStyle(el, 'overflow', 'hidden');
    this._renderer.setStyle(el, 'transition', `height ${COLLAPSE_ANIMATION_TIMING}`);

    this._isTransitionRunning = true;

    return (callback: () => void) => {
      const finish = () => {
        this._cancelPending();
        this._isTransitionRunning = false;
        if (isExpand) {
          // Remove the inline display so Bootstrap classes resume display control.
          this._renderer.removeStyle(el, 'display');
        } else {
          // Set display:none before removing the height style so the element
          // doesn't flash at its natural height for one frame.
          this._renderer.setStyle(el, 'display', 'none');
        }
        this._renderer.removeStyle(el, 'height');
        this._renderer.removeStyle(el, 'transition');
        this._renderer.removeStyle(el, 'overflow');
        callback();
      };

      // Guards against bubbled child events; falls back to a timeout if
      // transitionend never fires (e.g. start == end value).
      this._pendingFinish = onTransitionFinished(el, 'height', COLLAPSE_ANIMATION_DURATION_MS, finish);

      if (wasRunning) {
        // Mid-animation reversal: snapshot the current rendered height, force
        // a reflow so the browser registers it as the start state, then flip.
        const currentHeight = el.getBoundingClientRect().height;
        this._renderer.setStyle(el, 'height', `${currentHeight}px`);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        el.offsetHeight;
        this._renderer.setStyle(el, 'height', isExpand ? `${el.scrollHeight}px` : '0');
      } else if (isExpand) {
        // Pin at 0px and force a synchronous layout so the browser registers it
        // as the CSS "before-change" style, then defer the target height to the
        // next animation frame so Chrome paints the 0px start state first.
        this._renderer.setStyle(el, 'height', '0');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        el.offsetHeight;
        this._rafId = requestAnimationFrame(() => {
          this._rafId = undefined;
          this._renderer.setStyle(el, 'height', `${el.scrollHeight}px`);
        });
      } else {
        // Two-rAF pattern mirrors the expand direction: the first frame pins
        // the element at its natural height so the browser records a concrete
        // painted "before" value, then the second frame sets height:0 and the
        // browser transitions from the painted state.  A single rAF with an
        // offsetHeight reflow is not reliable across browsers because the forced
        // reflow inside a rAF callback is not always treated as a transition
        // "before-change" checkpoint.
        this._rafId = requestAnimationFrame(() => {
          this._renderer.setStyle(el, 'height', `${el.scrollHeight}px`);
          this._rafId = requestAnimationFrame(() => {
            this._rafId = undefined;
            this._renderer.setStyle(el, 'height', '0');
          });
        });
      }
    };
  }

  ngOnDestroy(): void {
    this._cancelPending();
  }

  private _cancelPending(): void {
    this._pendingFinish?.cancel();
    this._pendingFinish = undefined;
    if (this._rafId !== undefined) {
      cancelAnimationFrame(this._rafId);
      this._rafId = undefined;
    }
  }
}
