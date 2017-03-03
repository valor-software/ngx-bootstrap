import { Component, ChangeDetectionStrategy } from '@angular/core';

const DYNAMIC_TAB_OFFSET = 1;

@Component({
  selector: 'demo-tabs-dynamic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic.html'
})
export class DemoTabsDynamicComponent {
  public tabs: any[] = [
    {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
    {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true},
    {title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true}
  ];

  public onRemoved(event: any): void {
    this.tabs.splice(event.indexToRemove - DYNAMIC_TAB_OFFSET, 1);
  }

  public swapTabs(): void {
    const temp = this.tabs[this.tabs.length - 1];

    this.tabs[this.tabs.length - 1] = this.tabs[this.tabs.length - 2];
    this.tabs[this.tabs.length - 2] = temp;
  }

  public addTab(): void {
    this.tabs.push({
      title: `Dynamic Title ${this.tabs.length + 1}`,
      content: `Dynamic content ${this.tabs.length + 1}`,
      removable: true
    });
    this.tabs[this.tabs.length - 1].active = true;
  }
}
