import { Component } from '@angular/core';

@Component({
  selector: 'demo-accordion-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoAccordionDynamicComponent {
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  status: any = {
    isFirstOpen: true,
    isOpen: true
  };

  groups: any[] = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  addItem(): void {
    this.items.push(`Items ${this.items.length + 1}`);
  }
}
