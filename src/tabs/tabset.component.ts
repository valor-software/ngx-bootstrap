import {Component, ContentChildren, HostBinding, AfterContentInit, QueryList, Input, forwardRef} from '@angular/core';
import {TabsetConfig} from './tabset.config';
import {TabComponent} from './tab.component';

@Component({
  selector: 'tabset',
  template: `
      <ul class="nav" [ngClass]="classMap" (click)="$event.preventDefault()">
          <li *ngFor="let tabz of tabs" [ngClass]="['nav-item', tabz.customClass || '']"
              [class.active]="tabz.active" [class.disabled]="tabz.disabled">
              <a href="javascript:void(0);" class="nav-link"
                 [class.active]="tabz.active" [class.disabled]="tabz.disabled"
                 (click)="tabz.active = true">
                  <span [ngTransclude]="tabz.headingRef">{{tabz.heading}}</span>
                  <span *ngIf="tabz.removable">
              <span (click)="$event.preventDefault(); removeTab(tabz);" class="glyphicon glyphicon-remove-circle"></span>
            </span>
              </a>
          </li>
      </ul>
      <div class = "tab-content" style = "height: 100%;">
          <ng-content></ng-content>
      </div>
  `
})
export class TabsetComponent implements AfterContentInit {
  @ContentChildren(forwardRef(() => TabComponent)) public tabs: QueryList<TabComponent>;
  @HostBinding('class.tab-container') public clazz: boolean = true;

  public classMap: any = {};

  protected _vertical: boolean;
  protected _justified: boolean;
  protected _type: string;

  public constructor(config: TabsetConfig) {
    Object.assign(this, config);
  }

  public ngAfterContentInit(): void {
    this.selectTab(this.tabs.first);
  }

  public selectTab(tabToSelect: TabComponent): void {
    if (!tabToSelect.disabled && !tabToSelect.contentless) {
      this.getTabsAsArray().forEach((tab: TabComponent) => tab.active = false);

      tabToSelect.active = true;
    }
  }

  @Input()
  public get vertical(): boolean {
    return this._vertical;
  }

  public set vertical(value: boolean) {
    this._vertical = value;
    this.setClassMap();
  }

  /** if true tabs fill the container and have a consistent width */
  @Input()
  public get justified(): boolean {
    return this._justified;
  }

  public set justified(value: boolean) {
    this._justified = value;
    this.setClassMap();
  }

  /** navigation context class: 'tabs' or 'pills' */
  @Input()
  public get type(): string {
    return this._type;
  }

  public set type(value: string) {
    this._type = value;
    this.setClassMap();
  }

  public removeTab(tab: TabComponent): void {
    if (!tab.disabled && !tab.contentless) {
      const tabsAsArray: TabComponent[] = this.getTabsAsArray();
      const indexToRemove = tabsAsArray.indexOf(tab);

      if (indexToRemove === -1) {
        return;
      }

      const newActiveIndex: number = this.getClosestTabIndex(indexToRemove);

      if (newActiveIndex !== -1) {
        this.selectTab(tabsAsArray[newActiveIndex]);
      }

      tab.removed.emit({tab: tabsAsArray[indexToRemove], indexToRemove, newActiveIndex});
    }
  }

  protected getClosestTabIndex(index: number): number {
    const tabsAsArray: TabComponent[] = this.getTabsAsArray();
    const tabsLength = this.tabs.length;

    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step++) {
      const prevIndex = index - step;
      const nextIndex = index + step;

      if (tabsAsArray[nextIndex] && !tabsAsArray[nextIndex].disabled) {
        return nextIndex;
      }

      if (tabsAsArray[prevIndex] && !tabsAsArray[prevIndex].disabled) {
        return prevIndex;
      }
    }

    return -1;
  }

  protected getTabsAsArray(): TabComponent[] {
    return this.tabs.toArray();
  }

  protected setClassMap(): void {
    this.classMap = {
      'nav-stacked': this.vertical,
      'nav-justified': this.justified,
      [`nav-${this.type}`]: true
    };
  }
}
