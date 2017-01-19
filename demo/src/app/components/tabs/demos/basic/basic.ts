import { Component } from '@angular/core';

@Component({
  selector: 'demo-tabs-basic',
  templateUrl: './basic.html'
})
export class DemoTabsBasicComponent {

  public alertMe(): void {
    setTimeout(function (): void {
      alert('You\'ve selected the alert tab!');
    });
  }
}
