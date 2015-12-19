import {
  Component, Directive,
  OnInit, OnDestroy, DoCheck,
  Input, Output, HostListener, HostBinding,
  TemplateRef, EventEmitter
} from 'angular2/core';
import { NgClass } from 'angular2/common';
import { NgTransclude, IAttribute } from '../common';

// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
@Component({
  selector: 'tabset',
  directives: [NgClass, NgTransclude],
  template: `
    <ul class="nav" [ngClass]="classMap" (click)="$event.preventDefault()">
        <li *ngFor="#tabz of tabs" class="nav-item" [ngClass]="{active: tabz.active, disabled: tabz.disabled}">
          <a href class="nav-link" [ngClass]="{active: tabz.active, disabled: tabz.disabled}" (click)="tabz.active = true">
            <span [ngTransclude]="tabz.headingRef">{{tabz.heading}}</span>
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
    if (tab.active && this.tabs.length > 1) {
      // If this is the last tab, select the previous tab. else, the next tab.
      let newActiveIndex = index === this.tabs.length - 1 ? index - 1 : index + 1;
      this.tabs[newActiveIndex].active = true;
    }

    this.tabs.slice(index, 1);
  }
}

// TODO: templateUrl?
@Directive({selector: 'tab, [tab]'})
export class Tab implements OnInit, OnDestroy, DoCheck {
  @Input() public heading:string;
  @Input() public disabled:boolean;

  /** tab active state toogle */
  @HostBinding('class.active')
  @Input() public get active() {
    return this._active;
  }

  @Output() public select:EventEmitter<Tab> = new EventEmitter();
  @Output() public deselect:EventEmitter<Tab> = new EventEmitter();


  public set active(active) {
    if (this.disabled && active || !active) {
      if (!active) {
        this._active = active;
      }

      this.deselect.emit(this);
      return;
    }

    this._active = active;
    this.select.emit(this);
    this.tabset.tabs.forEach((tab:Tab) => {
      if (tab !== this) {
        tab.active = false;
      }
    });
  }

  @HostBinding('class.tab-pane') private addClass = true;

  private _active:boolean;
  public headingRef:TemplateRef;

  constructor(public tabset:Tabset) {
    this.tabset.addTab(this);
  }

  ngDoCheck():boolean {
    return true;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.tabset.removeTab(this);
  }
}

@Directive({selector: '[tab-heading]'})
export class TabHeading {
  constructor(public templateRef:TemplateRef, tab:Tab) {
    tab.headingRef = templateRef;
  }
}

export const TAB_DIRECTIVES:Array<any> = [Tab, TabHeading, Tabset];
/**
 * @deprecated - use TAB_DIRECTIVES instead
 * @type {Tab|TabHeading|Tabset[]}
 */
export const tabs:Array<any> = [Tab, TabHeading, Tabset];
