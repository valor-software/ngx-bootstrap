import { Component } from '@angular/core';

@Component({
  selector: 'custom-item-content-demo',
  templateUrl: './custom-item-content.html'
})
export class DemoCustomItemContentComponent {
  itemStringsLeft = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];

  itemStringsRight = ['Mr. O', 'Tomato'];
}
