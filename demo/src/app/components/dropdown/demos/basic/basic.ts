import { Component } from '@angular/core';

@Component({
  selector: 'demo-dropdown-basic',
  templateUrl: './basic.html'
})
export class DemoDropdownBasicComponent {
  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}
