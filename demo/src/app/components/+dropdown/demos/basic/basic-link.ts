import { Component } from '@angular/core';

@Component({
  selector: 'demo-dropdown-basic-link',
  templateUrl: './basic-link.html'
})
export class DemoDropdownBasicLinkComponent {
  public items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  public onHidden(): void {
    console.log('Dropdown is hidden');
  }
  public onShown(): void {
    console.log('Dropdown is shown');
  }
  public isOpenChange(): void {
    console.log('Dropdown state is changed');
  }
}
