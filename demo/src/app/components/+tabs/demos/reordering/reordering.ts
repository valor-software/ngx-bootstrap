import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TabReorderEvent } from 'ng2-bootstrap/tabs';

@Component({
  selector: 'demo-tabs-reordering',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reordering.html'
})
export class DemoTabsReorderingComponent {
  public tabs: any[] = [
    {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
    {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true},
    {title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true},
    {title: 'Dynamic Title 4', content: 'Dynamic content 4', removable: true}
  ];

  public setActiveTab(index: number): void {
    this.tabs[index].active = true;
  }

  public removeTabHandler(tab:any): void {
    console.log('Remove Tab handler');
  }
  
  public reorderTabHandler(event: TabReorderEvent) {
    console.log('reorderTabHandler:');
    console.log(event);
  }
}
