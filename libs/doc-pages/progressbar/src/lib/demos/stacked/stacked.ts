import { Component } from '@angular/core';

interface IStack {
  value: number;
  type: string;
  label: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-progressbar-stacked',
  templateUrl: './stacked.html'
})
export class DemoProgressbarStackedComponent {
  type: string;
  stacked: IStack[] = [];

  constructor() {
    this.randomStacked();
  }

  randomStacked(): void {
    const types = ['success', 'info', 'warning', 'danger'];

    this.stacked = [];
    const n = Math.floor(Math.random() * 4 + 1);
    for (let i = 0; i < n; i++) {
      const index = Math.floor(Math.random() * 4);
      const value = Math.floor(Math.random() * 27 + 3);
      this.stacked.push({
        value,
        type: types[index],
        label: value + ' %'
      });
    }
  }
}
