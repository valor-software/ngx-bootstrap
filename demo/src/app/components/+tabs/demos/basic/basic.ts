import { Component, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'demo-tabs-basic',
  templateUrl: './basic.html'
})
export class DemoTabsBasicComponent {
  public alertMe(): void {
    setTimeout(function(): void {
      alert("You've selected the alert tab!");
    });
  }
}
