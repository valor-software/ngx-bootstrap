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

  public itemStyle: {} = {
    display: 'block',
    padding: '6px 12px',
    'margin-bottom': '4px',
    'font-size': '14px',
    'font-weight': 400,
    'line-height': '1.4em',
    'text-align': 'center',
    cursor: 'grab',
    border: '1px solid transparent',
    'border-radius': '4px',
    'border-color': '#adadad'
  };

  public itemActiveStyle: {} = {
    'background-color': '#e6e6e6',
    'box-shadow': 'inset 0 3px 5px rgba(0,0,0,.125)'
  };

  public wrapperStyle: {} = {
    'min-height': '150px'
  };

  public placeholderStyle: {} = Object.assign({}, this.itemStyle, { height: '150px' });
}
