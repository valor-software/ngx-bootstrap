import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2
} from '@angular/core';

import { BsDropdownState } from './bs-dropdown.state';

import { DROPDOWN_ANIMATION_TIMING } from './dropdown-animations';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

// todo: revert ngClass to [class] when false positive angular-cli issue is fixed
//          [class.dropdown]="direction === 'down'"-->
@Component({
  selector: 'bs-dropdown-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass],
  host: {
    style: 'display:block;position: absolute;z-index: 1040'
  },
  template: `
    <div [class.dropup]="direction === 'up'"
         [ngClass]="{dropdown: direction === 'down'}"
         [class.show]="isOpen"
         [class.open]="isOpen"><ng-content></ng-content>
    </div>
  `,
})
export class BsDropdownContainerComponent implements OnDestroy {
  isOpen = false;

  get direction(): 'down' | 'up' {
    return this._state.direction;
  }

  private _subscription: Subscription;

  constructor(
    private _state: BsDropdownState,
    private cd: ChangeDetectorRef,
    private _renderer: Renderer2,
    private _element: ElementRef
  ) {
    this._subscription = _state.isOpenChange.subscribe((value: boolean) => {
      this.isOpen = value;
      const dropdown = this._element.nativeElement.querySelector('.dropdown-menu');

      this._renderer.addClass(this._element.nativeElement.querySelector('div'), 'open');

      if (dropdown) {
        this._renderer.addClass(dropdown, 'show');

        if (dropdown.classList.contains('dropdown-menu-right') || dropdown.classList.contains('dropdown-menu-end')) {
          this._renderer.setStyle(dropdown, 'left', 'auto');
          this._renderer.setStyle(dropdown, 'right', '0');
        }
        if (this.direction === 'up') {
          this._renderer.setStyle(dropdown, 'top', 'auto');
          this._renderer.setStyle(
            dropdown,
            'transform',
            'translateY(-101%)'
          );
        }
      }

      if (dropdown && this._state.isAnimated) {
        this._animateExpand(dropdown, this._renderer);
      }

      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }

  private _animateExpand(el: HTMLElement, renderer: Renderer2): void {
    renderer.setStyle(el, 'display', 'block');
    renderer.setStyle(el, 'overflow', 'hidden');
    renderer.setStyle(el, 'transition', `height ${DROPDOWN_ANIMATION_TIMING}`);
    renderer.setStyle(el, 'height', '0');

    // forced reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;

    let finished = false;
    const finish = () => {
      if (finished) {
        return;
      }
      finished = true;
      clearTimeout(fallbackId);
      renderer.removeStyle(el, 'height');
      renderer.removeStyle(el, 'overflow');
      renderer.removeStyle(el, 'transition');
      renderer.removeStyle(el, 'display');
    };

    const fallbackId = setTimeout(finish, 270);

    requestAnimationFrame(() => {
      renderer.setStyle(el, 'height', el.scrollHeight + 'px');
      el.addEventListener('transitionend', finish, { once: true });
    });
  }

  /** @internal */
  _contains(el: Element): boolean {
    return this._element.nativeElement.contains(el);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
