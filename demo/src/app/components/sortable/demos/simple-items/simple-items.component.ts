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

  public itemStringsRight: any[] = [
    'Mr. O',
    'Tomato'
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
