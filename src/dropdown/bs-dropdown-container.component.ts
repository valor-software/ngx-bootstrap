import { AnimationBuilder, AnimationFactory } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { Subscription } from 'rxjs';

import { BsDropdownState } from './bs-dropdown.state';

import { dropdownAnimation } from './dropdown-animations';

// todo: revert ngClass to [class] when false positive angular-cli issue is fixed
//          [class.dropdown]="direction === 'down'"-->
@Component({
  selector: 'bs-dropdown-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    style: 'display:block;position: absolute;z-index: 1040'
  },
  template: `
    <div [class.dropup]="direction === 'up'"
         [ngClass]="{dropdown: direction === 'down'}"
         [class.show]="isOpen"
         [class.open]="isOpen"><ng-content></ng-content>
    </div>
  `
})
export class BsDropdownContainerComponent implements OnDestroy {
  isOpen = false;

  private _factoryDropDownAnimation: AnimationFactory;

  get direction(): 'down' | 'up' {
    return this._state.direction;
  }

  private _subscription: Subscription;

  constructor(
    private _state: BsDropdownState,
    private cd: ChangeDetectorRef,
    private _renderer: Renderer2,
    private _element: ElementRef,
    _builder: AnimationBuilder
  ) {
    this._factoryDropDownAnimation = _builder.build(dropdownAnimation);

    this._subscription = _state.isOpenChange.subscribe((value: boolean) => {
      this.isOpen = value;
      const dropdown = this._element.nativeElement.querySelector('.dropdown-menu');

      this._renderer.addClass(this._element.nativeElement.querySelector('div'), 'open');

      if (dropdown && !isBs3()) {
        this._renderer.addClass(dropdown, 'show');

        if (dropdown.classList.contains('dropdown-menu-right')) {
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
        this._factoryDropDownAnimation.create(dropdown)
          .play();
      }

      this.cd.markForCheck();
      this.cd.detectChanges();
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
