import { Component } from '@angular/core';

@Component({
  selector: 'demo-tabs-styling',
  templateUrl: './styling.html'
})
export class DemoTabsStylingComponent {
  public tabs: any[] = [
    {
      title: 'Dynamic Title 1',
      content: 'Dynamic content 1',
      customClass: 'customClass'
    },
    {
      title: 'Dynamic Title 2',
      content: 'Dynamic content 2',
      customClass: 'customClass'
    }
  ];
}
