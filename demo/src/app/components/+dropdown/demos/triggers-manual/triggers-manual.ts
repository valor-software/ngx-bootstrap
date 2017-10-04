import { Component } from '@angular/core';

@Component({
  selector: 'demo-dropdown-triggers-manual',
  templateUrl: './triggers-manual.html'
})
export class DemoDropdownTriggersManualComponent {
  status: { isopen: boolean } = { isopen: false };

  toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  change(value: boolean): void {
    this.status.isopen = value;
  }
}
