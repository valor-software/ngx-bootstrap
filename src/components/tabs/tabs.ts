/// <reference path="../../../typings/tsd.d.ts" />

import {
  Component, View, Directive,
  LifecycleEvent, EventEmitter,
  ElementRef, TemplateRef,
  coreDirectives, CSSClass
} from 'angular2/angular2';

import {NgTransclude} from '../common';

// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
@Component({
  selector: 'tabset',
  properties: ['vertical', 'justified', 'type'],
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
    <div>
      <ul class="nav" [class]="classMap">
          <li *ng-for="#tabz of tabs" [class]="{active: tabz.active, disabled: tabz.disabled}">
            <a href (^click)="tabz.active = true">
              <span  [ng-transclude]="tabz.headingRef">{{tabz.heading}}</span>
            </a>
          </li>
      </ul>
      <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  directives: [coreDirectives, CSSClass, NgTransclude]
})
export class Tabset {
  private vertical:boolean;
  private justified:boolean;
  private type:string;

  public tabs:Array<Tab> = [];

  private get classMap() {
    let map = {
      'nav-stacked': this.vertical,
      'nav-justified': this.justified
    };
    map['nav-' + (this.type || 'tabs')] = true;
    return map;
  }

  constructor() {
  }

  onInit() {
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
    if (tab.active && this.tabs.length > 1) {
      // If this is the last tab, select the previous tab. else, the next tab.
      let newActiveIndex = index === this.tabs.length - 1 ? index - 1 : index + 1;
      this.tabs[newActiveIndex].active = true;
    }

    this.tabs.slice(index, 1);
  }
}

// TODO: templateUrl?
@Directive({
  selector: 'tab, [tab]',
  properties: ['active', 'disable', 'disabled', 'heading'],
  events: ['select', 'deselect'],
  host: {
    '[class.tab-pane]': 'true',
    '[class.active]': 'active'
  },
  lifecycle: [LifecycleEvent.onInit, LifecycleEvent.onDestroy,
    LifecycleEvent.onCheck]
})
export class Tab {
  public _active:boolean;
  public disabled:boolean;
  public heading:string;

  public headingRef:TemplateRef;

  public select:EventEmitter = new EventEmitter();
  public deselect:EventEmitter = new EventEmitter();

  constructor(public tabset:Tabset) {
    this.tabset.addTab(this);
  }

  private set disable(v:boolean) {
    console.warn('DEPRECATED use `disabled` property (not `disable`)');
    this.disabled = v;
  }

  /** DEPRECATE disable */
  private get disable() {
    return this.disabled;
  }

  /** tab active state toogle */
  public get active() {
    return this._active;
  }

  public set active(active) {
    if (this.disabled && active || !active) {
      if (!active) {
        this._active = active;
      }

      this.deselect.next(this);
      return;
    }

    this._active = active;
    this.select.next(this);
    this.tabset.tabs.forEach((tab:Tab) => {
      if (tab !== this) {
        tab.active = false;
      }
    });
  }

  onCheck() {
  }

  onInit() {
  }

  onDestroy() {
    this.tabset.removeTab(this);
  }
}

@Directive({selector: '[tab-heading]'})
export class TabHeading {
  constructor(public templateRef:TemplateRef, tab:Tab) {
    tab.headingRef = templateRef;
  }
}

export const tabs:Array<any> = [Tab, TabHeading, Tabset];
