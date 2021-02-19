import { Component } from '@angular/core';

@Component({
  selector: 'custom-item-template-demo',
  templateUrl: './custom-item-template.html'
})
export class CustomItemTemplateDemoComponent {
  itemStringsLeft: any[] = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];

  itemStringsRight: any[] = ['Mr. O', 'Tomato'];
}
