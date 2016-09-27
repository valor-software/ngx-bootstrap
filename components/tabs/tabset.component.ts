import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

import { TabDirective } from './tab.directive';
// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
@Component({
  selector: 'tabset',
  template: `
    <ul class="nav" [ngClass]="classMap" (click)="$event.preventDefault()">
        <li *ngFor="let tabz of tabs" class="nav-item {{tabz.customClass}}"
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
    <div class="tab-content">
      <ng-content></ng-content>
    </div>
  `
})
export class TabsetComponent implements OnInit, OnDestroy {
  @Input()
  public get vertical():boolean {
    return this._vertical;
  };

  @Input()
  public get justified():boolean {
    return this._justified;
  };

  @Input()
  public get type():string {
    return this._type;
  };

  @HostBinding('class.tab-container') public clazz:boolean = true;

  public set vertical(value:boolean) {
    this._vertical = value;
    this.setClassMap();
  }

  public set justified(value:boolean) {
    this._justified = value;
    this.setClassMap();
  }

  public set type(value:string) {
    this._type = value;
    this.setClassMap();
  }

  public tabs:Array<TabDirective> = [];
  public classMap:any = {};

  private isDestroyed:boolean;
  private _vertical:boolean;
  private _justified:boolean;
  private _type:string;

  public ngOnInit():void {
    this.type = this.type !== 'undefined' ? this.type : 'tabs';
  }

  public ngOnDestroy():void {
    this.isDestroyed = true;
  }

  public addTab(tab:TabDirective):void {
    this.tabs.push(tab);
    tab.active = this.tabs.length === 1 && tab.active !== false;
  }

  public removeTab(tab:TabDirective):void {
    let index = this.tabs.indexOf(tab);
    if (index === -1 || this.isDestroyed) {
      return;
    }
    // Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && this.hasAvailableTabs(index)) {
      let newActiveIndex = this.getClosestTabIndex(index);
      this.tabs[newActiveIndex].active = true;
    }

    tab.removed.emit(tab);
    this.tabs.splice(index, 1);
  }

  private getClosestTabIndex(index:number):number {
    let tabsLength = this.tabs.length;
    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step += 1) {
      let prevIndex = index - step;
      let nextIndex = index + step;
      if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
        return prevIndex;
      }
      if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
        return nextIndex;
      }
    }
    return -1;
  }

  private hasAvailableTabs(index:number):boolean {
    let tabsLength = this.tabs.length;
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

  private setClassMap():void {
    this.classMap = {
      'nav-stacked': this.vertical,
      'nav-justified': this.justified,
      ['nav-' + (this.type || 'tabs')]: true
    };
  }
}
