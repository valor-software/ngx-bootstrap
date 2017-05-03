import { Component } from '@angular/core';

@Component({
  selector: 'demo-dropdown-basic-link',
  templateUrl: './basic-link.html'
})
export class DemoDropdownBasicLinkComponent {
  public items: string[] = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }
  public onHidden(): void {
    console.log('Dropdown is hide');
  }
  public onShown(): void {
    console.log('Dropdown is Show');
  }
}
