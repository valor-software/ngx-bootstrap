import { Component } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'demo-tabs-prevent-select',
  templateUrl: './prevent-select.html'
})
export class DemoTabsPreventSelectComponent {
  deselect(tab: TabDirective) {
    if (!confirm('Are you sure you want to leave this tab?')) {
      tab.preventDeselect();
    }
  }
}
