import { Component } from '@angular/core';

@Component({
  selector: 'demo-dropdown-triggers-manual',
  templateUrl: './triggers-manual.html'
})
export class DemoDropdownTriggersManualComponent {
  public status: { isopen: boolean } = { isopen: false };

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public change(value: boolean): void {
    this.status.isopen = value;
  }
}
