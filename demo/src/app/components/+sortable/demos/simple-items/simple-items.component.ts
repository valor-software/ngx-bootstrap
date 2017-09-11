import { Component } from '@angular/core';

@Component({
  selector: 'simple-items-demo',
  templateUrl: './simple-items.component.html'
})
export class SimpleItemsDemoComponent {
  public itemStringsLeft: any[] = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];

  public itemStringsRight: any[] = ['Mr. O', 'Tomato'];
}
