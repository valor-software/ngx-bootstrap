import { Component } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'demo-tabs-select-event',
  templateUrl: './select-event.html'
})
export class DemoTabsSelectEventComponent {
  value: string;
  onSelect(data: TabDirective): void {
    this.value = data.heading;
  }
}
