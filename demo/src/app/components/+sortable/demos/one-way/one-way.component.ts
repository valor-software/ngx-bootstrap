import { Component } from '@angular/core';

@Component({
  selector: 'one-way-demo',
  templateUrl: './one-way.component.html'
})
export class OneWayDemoComponent {
  public itemStringsLeft: any[] = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];

  public itemStringsRight: any[] = [
    'Mr. O',
    'Tomato'
  ];
}
