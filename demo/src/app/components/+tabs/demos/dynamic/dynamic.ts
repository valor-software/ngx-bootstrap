import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'demo-tabs-dynamic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic.html'
})
export class DemoTabsDynamicComponent {
  tabs: any[] = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2' },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true }
  ];

  @ViewChild(TabsetComponent) tabset: TabsetComponent;
  @ViewChild('asd') asdTemplate;

  addNewTab(): void {
    const newTabIndex = this.tabs.length + 1;
    this.tabs.push({
      title: `Dynamic Title ${newTabIndex}`,
      content: `Dynamic content ${newTabIndex}`,
      disabled: false,
      removable: true
    });
  }

  removeTabHandler(tab: any): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
    console.log('Remove Tab handler');
  }

  addDynamic() {
    this.tabset.openTab({
      heading: 'dsfsdsgs',
      tabTemplate: this.asdTemplate,
      removable: true
    }, {});
  }
}
