import { Component, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'demo-tabs-disable',
  templateUrl: './disable.html'
})
export class DemoTabsDisableComponent {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  disableEnable() {
    this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }
}
