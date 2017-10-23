import { Component } from '@angular/core';

@Component({
  selector: 'demo-bs4-progressbar-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoProgressbarDynamicBs4Component {
  max: number = 200;
  showWarning: boolean;
  dynamic: number;
  type: string;

  constructor() {
    this.random();
  }

  random(): void {
    let value = Math.floor(Math.random() * 100 + 1);
    let type: string;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    this.showWarning = type === 'danger' || type === 'warning';
    this.dynamic = value;
    this.type = type;
  }
}
