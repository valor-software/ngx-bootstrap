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
    let types = ['success', 'info', 'warning', 'danger'];

    this.stacked = [];
    let n = Math.floor(Math.random() * 4 + 1);
    for (let i = 0; i < n; i++) {
      let index = Math.floor(Math.random() * 4);
      let value = Math.floor(Math.random() * 27 + 3);
      this.stacked.push({
        value,
        type: types[index],
        label: value + ' %'
      });
    }
  }
}
