import { Component, Input, Output, HostBinding, EventEmitter, TemplateRef } from '@angular/core';
import { TabsetComponent } from './tabset.component';

@Component({
  selector: 'tab, [tab]',
  template: `
      <div [hidden]="!active" class="tab-pane">
          <ng-content></ng-content>
      </div>
  `
})
export class TabComponent {
  @Input() public heading: string;
  @Input() public disabled: boolean = false;
  @Input() public removable: boolean = false;
  @Input() public contentless: boolean = false;
  @Input() public customClass: string;

  @Output() public select: EventEmitter<TabComponent> = new EventEmitter();
  @Output() public deselect: EventEmitter<TabComponent> = new EventEmitter();
  @Output() public removed: EventEmitter<any> = new EventEmitter();

  public headingRef: TemplateRef<any>;

  protected _active: boolean;
  protected tabset: TabsetComponent;

  public constructor(tabset: TabsetComponent) {
    this.tabset = tabset;
  }

  @HostBinding('class.active')
  @Input()
  public get active(): boolean {
    return this._active;
  }

  public set active(active: boolean) {
    if (this.disabled && active || !active) {
      if (!active) {
        this._active = active;
      }

      this.deselect.emit(this);
      return;
    }

    this._active = active;
    this.select.emit(this);

    if (this.tabset && this.tabset.tabs && this.tabset.tabs.forEach) {
      this.tabset.tabs.forEach((tab: TabComponent) => {
        if (tab !== this) {
          tab.active = false;
        }
      });
    }
  }
}
