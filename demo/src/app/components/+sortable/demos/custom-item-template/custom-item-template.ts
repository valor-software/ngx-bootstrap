import { Component } from '@angular/core';

@Component({
  selector: 'custom-item-template-demo',
  templateUrl: './custom-item-template.html'
})
export class CustomItemTemplateDemoComponent {
  public itemStringsLeft: any[] = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];

  public itemStringsRight: any[] = ['Mr. O', 'Tomato'];
}
