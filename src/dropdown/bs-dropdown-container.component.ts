import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
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

  constructor(private _state: BsDropdownState, private cd: ChangeDetectorRef) {
    this._subscription = _state.isOpenChange.subscribe((value: boolean) => {
      this.isOpen = value;
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
