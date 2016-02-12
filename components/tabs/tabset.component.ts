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
  private destroyed: boolean;

  constructor() {
  }

  ngOnInit() {
    this.type = this.type !== 'undefined' ? this.type : 'tabs';
  }

  ngOnDestroy() {
    this.destroyed = true;
  }

  public addTab(tab:Tab) {
    this.tabs.push(tab);
    tab.active = this.tabs.length === 1 && tab.active !== false;
  }

  public removeTab(tab:Tab) {
    let index = this.tabs.indexOf(tab);
    if (index === -1 || this.destroyed) {
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
