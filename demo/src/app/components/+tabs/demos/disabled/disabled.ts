import { Component, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'demo-tabs-disabled',
  templateUrl: './disabled.html'
})
export class DemoTabsDisabledComponent {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  disableEnable() {
    this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }
}
