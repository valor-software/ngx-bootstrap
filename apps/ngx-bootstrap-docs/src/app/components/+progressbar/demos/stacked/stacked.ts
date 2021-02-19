import { Component } from '@angular/core';

@Component({
  selector: 'demo-progressbar-stacked',
  templateUrl: './stacked.html'
})
export class DemoProgressbarStackedComponent {
  type: string;
  stacked: any[] = [];

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
