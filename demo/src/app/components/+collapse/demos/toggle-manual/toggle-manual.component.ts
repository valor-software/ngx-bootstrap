import { Component } from '@angular/core';

@Component({
  selector: 'toggle-manual-demo',
  templateUrl: './toggle-manual.component.html'
})
export class ToggleManualDemoComponent {
  showSelected = true;
  hideContent() {
    this.showSelected = true;
  }
  showContent() {
    this.showSelected = false;
  }

}
