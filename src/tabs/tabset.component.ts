import { Component, HostBinding, Input, OnDestroy, Renderer2 } from '@angular/core';

import { TabDirective } from './tab.directive';
import { TabsetConfig } from './tabset.config';
// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
@Component({
  selector: 'tabset',
  templateUrl: './tabset.component.html'
})
export class TabsetComponent implements OnDestroy {
  /** if true tabs will be placed vertically */
  @Input()
  get vertical(): boolean {
    return this._vertical;
  }
  set vertical(value: boolean) {
    this._vertical = value;
    this.setClassMap();
  }

  /** if true tabs fill the container and have a consistent width */
  @Input()
  get justified(): boolean {
    return this._justified;
  }
  set justified(value: boolean) {
    this._justified = value;
    this.setClassMap();
  }

  /** navigation context class: 'tabs' or 'pills' */
  @Input()
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
    this.setClassMap();
  }

  @HostBinding('class.tab-container') clazz = true;

  tabs: TabDirective[] = [];
  classMap: any = {};

  protected isDestroyed: boolean;
  protected _vertical: boolean;
  protected _justified: boolean;
  protected _type: string;

  constructor(config: TabsetConfig, private renderer: Renderer2) {
    Object.assign(this, config);
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
  }

  addTab(tab: TabDirective): void {
    this.tabs.push(tab);
    tab.active = this.tabs.length === 1 && typeof tab.active === 'undefined';
  }

  removeTab(
    tab: TabDirective,
    options = { reselect: true, emit: true }
  ): void {
    const index = this.tabs.indexOf(tab);
    if (index === -1 || this.isDestroyed) {
      return;
    }
    // Select a new tab if the tab to be removed is selected and not destroyed
    if (options.reselect && tab.active && this.hasAvailableTabs(index)) {
      const newActiveIndex = this.getClosestTabIndex(index);
      this.tabs[newActiveIndex].active = true;
    }
    if (options.emit) {
      tab.removed.emit(tab);
    }
    this.tabs.splice(index, 1);
    if (tab.elementRef.nativeElement.parentNode) {
      this.renderer.removeChild(
        tab.elementRef.nativeElement.parentNode,
        tab.elementRef.nativeElement
      );
    }
  }

  protected getClosestTabIndex(index: number): number {
    const tabsLength = this.tabs.length;
    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step += 1) {
      const prevIndex = index - step;
      const nextIndex = index + step;
      if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
        return prevIndex;
      }
      if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
        return nextIndex;
      }
    }

    return -1;
  }

  protected hasAvailableTabs(index: number): boolean {
    const tabsLength = this.tabs.length;
    if (!tabsLength) {
      return false;
    }

    for (let i = 0; i < tabsLength; i += 1) {
      if (!this.tabs[i].disabled && i !== index) {
        return true;
      }
    }

    return false;
  }

  protected setClassMap(): void {
    this.classMap = {
      'nav-stacked': this.vertical,
      'flex-column': this.vertical,
      'nav-justified': this.justified,
      [`nav-${this.type}`]: true
    };
  }
}
