import { Component } from '@angular/core';

@Component({
  selector: 'demo-bs4-progressbar-stacked',
  templateUrl: './stacked.html'
})
export class DemoProgressbarStackedBs4Component {
  public max: number = 200;
  public type: string;
  public stacked: any[] = [];

  public constructor() {
    this.randomStacked();
  }

  public randomStacked(): void {
    let types = ['success', 'info', 'warning', 'danger'];

    this.stacked = [];
    let total = 0;
    let n = Math.floor((Math.random() * 4) + 1);
    for (let i = 0; i < n; i++) {
      let index = Math.floor((Math.random() * 4));
      let value = Math.floor((Math.random() * 30) + 1);
      total += value;
      this.stacked.push({
        value,
        max: value, // i !== (n - 1) ? value : 100,
        type: types[index]
      });
    }
  }

}
