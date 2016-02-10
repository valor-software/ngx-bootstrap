import {Component, OnInit, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {NgTransclude} from '../common';
import {Tab} from './tab.directive';
// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
@Component({
  selector: 'tabset',
  directives: [NgClass, NgTransclude],
  template: `
    <ul class="nav" [ngClass]="classMap" (click)="$event.preventDefault()">
        <li *ngFor="#tabz of tabs" class="nav-item"
          [class.active]="tabz.active" [class.disabled]="tabz.disabled">
          <a href class="nav-link"
            [class.active]="tabz.active" [class.disabled]="tabz.disabled"
            (click)="tabz.active = true">
            <span [ngTransclude]="tabz.headingRef">{{tabz.heading}}</span>
            <span [hidden]="!tabz.removable">
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
export class Tabset implements OnInit {
  @Input() private get vertical() {
    return this._vertical;
  };

  @Input() private get justified() {
    return this._justified;
  };

  @Input() private get type() {
    return this._type;
  };

  private set vertical(value) {
    this._vertical = value;
    this.setClassMap();
  }

  private set justified(value) {
    this._justified = value;
    this.setClassMap();
  }

  private set type(value) {
    this._type = value;
    this.setClassMap();
  }

  private setClassMap() {
    this.classMap = {
      'nav-stacked': this.vertical,
      'nav-justified': this.justified,
      ['nav-' + (this.type || 'tabs')]: true
    };
  }

  public tabs:Array<Tab> = [];

  private _vertical:boolean;
  private _justified:boolean;
  private _type:string;
  private classMap:any = {};

  constructor() {
  }

  ngOnInit() {
    this.type = this.type !== 'undefined' ? this.type : 'tabs';
  }

  public addTab(tab:Tab) {
    this.tabs.push(tab);
    tab.active = this.tabs.length === 1 && tab.active !== false;
  }

  public removeTab(tab:Tab) {
    let index = this.tabs.indexOf(tab);
    if (index === -1) {
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

  private getClosestTabIndex (index:number):number {
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

  private hasAvailableTabs (index:number) {
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
}
