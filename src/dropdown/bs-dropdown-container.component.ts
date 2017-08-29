import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, Renderer } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';

@Component({
  selector: 'bs-dropdown-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display:block;position: absolute;'
  },
  template: `
    <div [class.dropup]="direction === 'up'"
         [class.dropdown]="direction === 'down'"
         [class.show]="isOpen"
         [class.open]="isOpen"><ng-content></ng-content></div>
  `
})
export class BsDropdownContainerComponent implements OnDestroy {
  isOpen = false;

  get direction(): 'down' | 'up' {
    return this._state.direction;
  }

  private _subscription: any;

  constructor(private _state: BsDropdownState, private cd: ChangeDetectorRef, private _renderer: Renderer, _element: ElementRef) {
    this._subscription = _state.isOpenChange.subscribe((value: boolean) => {
      this.isOpen = value;
      const dropdown = _element.nativeElement.querySelector('.dropdown-menu');
      if (dropdown) {
        this._renderer.setElementClass(dropdown, 'show', true);
        if (dropdown.classList.contains('dropdown-menu-right')) {
          this._renderer.setElementStyle(dropdown, 'left', 'auto');
          this._renderer.setElementStyle(dropdown, 'right', '0');
        }
        if (this.direction === 'up') {
          this._renderer.setElementStyle(dropdown, 'top', 'auto');
          this._renderer.setElementStyle(dropdown, 'transform', 'translateY(-101%)');
        }
      }
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
