import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-dropdown-trigger-by-isopen',
  templateUrl: './trigger-by-isopen-property.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoDropdownByIsOpenPropComponent {
  isOpenValue = false;

  toggleDropdown() {
    this.isOpenValue = !this.isOpenValue;
  }
  
  isOpenChange(event: boolean) {
    this.isOpenValue = event;
  }
}
