import { Component } from '@angular/core';

@Component({
  selector: 'demo-progressbar-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoProgressbarDynamicComponent {
  public max: number = 200;
  public showWarning: boolean;
  public dynamic: number;
  public type: string;

  public constructor() {
    this.random();
  }

  public random(): void {
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
