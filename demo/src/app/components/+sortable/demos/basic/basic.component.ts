import { Component } from '@angular/core';

@Component({
  selector: 'basic-demo',
  templateUrl: './basic.component.html'
})
export class DemoBasicComponent {
  itemStringsLeft = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];

  itemStringsRight = ['Mr. O', 'Tomato'];
}
