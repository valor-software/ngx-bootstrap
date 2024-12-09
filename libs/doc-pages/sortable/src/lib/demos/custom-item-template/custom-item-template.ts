import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'custom-item-template-demo',
  templateUrl: './custom-item-template.html',
  standalone: false
})
export class CustomItemTemplateDemoComponent {
  itemStringsLeft: string[] = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];

  itemStringsRight: string[] = ['Mr. O', 'Tomato'];
}
