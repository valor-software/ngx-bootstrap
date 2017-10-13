import { Component } from '@angular/core';

@Component({
  selector: 'simple-items-demo',
  templateUrl: './simple-items.component.html'
})
export class SimpleItemsDemoComponent {
  itemStringsLeft: any[] = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];

  itemStringsRight: any[] = ['Mr. O', 'Tomato'];
}
