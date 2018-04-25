import { Component, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'demo-tabs-manual-selection',
  templateUrl: './manual-selection.html'
})
export class DemoTabsManualSelectionComponent {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }
}
