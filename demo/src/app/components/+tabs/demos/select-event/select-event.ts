import { Component } from '@angular/core';
import { TabComponent } from 'src/tabs/tab.component';

@Component({
  selector: 'demo-tabs-select-event',
  templateUrl: './select-event.html'
})
export class DemoTabsSelectEventComponent {
  value: string;
  onSelect(data: TabComponent): void {
    this.value = data.heading;
  }
}
