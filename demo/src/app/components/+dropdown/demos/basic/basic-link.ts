import { Component } from '@angular/core';

@Component({
  selector: 'demo-dropdown-basic-link',
  templateUrl: './basic-link.html'
})
export class DemoDropdownBasicLinkComponent {
  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }
}
