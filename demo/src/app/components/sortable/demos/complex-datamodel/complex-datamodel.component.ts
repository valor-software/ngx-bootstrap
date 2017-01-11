import { Component } from '@angular/core';

@Component({
  selector: 'complex-datamodel-demo',
  templateUrl: './complex-datamodel.component.html'
})
export class ComplexDatamodelDemoComponent {
  public itemObjectsLeft: any[] = [
    { id: 1, name: 'Windstorm' },
    { id: 2, name: 'Bombasto' },
    { id: 3, name: 'Magneta' }
  ];

  public itemObjectsRight: any[] = [
    { id: 4, name: 'Tornado' },
    { id: 5, name: 'Mr. O' },
    { id: 6, name: 'Tomato' }
  ];
}
