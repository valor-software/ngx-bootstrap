/// <reference path="../../../typings/tsd.d.ts" />

import {
Component, View,
Directive, LifecycleEvent,
EventEmitter, ElementRef
} from 'angular2/angular2';

// todo: support template url
@Component({
  selector: 'accordion, [accordion]',
  properties: [
    'templateUrl',
    'bCloseOthers: closeOthers'
  ],
  host: {},
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
  <div class="panel-group">
    <ng-content></ng-content>
  </div>
  `
})
export class Accordion {
  private templateUrl:string;
  private bCloseOthers:boolean;

  private groups:Array<any> = [];

  constructor() {
  }

  onInit() {
    this.bCloseOthers = this.bCloseOthers === false;
  }

  public closeOthers(openGroup:any) {
    if (!this.bCloseOthers) {
      return;
    }

    this.groups.forEach((group) => {
      group.isOpen = group === openGroup;
    });
  }

  public addGroup(group) {
    this.groups.push(group);
    // todo: remove group on destroy
  }

  public removeGroup(group) {
    let index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.slice(index, 1);
    }
  }
}

// todo: support template url
// todo: support custom `open class`
@Component({
  selector: 'accordion-group, [accordion-group]',
  properties: [
    'templateUrl',
    'heading',
    'isOpen',
    'isDisabled'
  ],
  host: {
    '[class.panel-open]': 'isOpen'
  },
  lifecycle: [LifecycleEvent.onInit, LifecycleEvent.onDestroy]
})
@View({
  template: `
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a href tabindex="0" class="accordion-toggle"
        ng-click="toggleOpen()"
        accordion-transclude="heading">
          <span ng-class="{'text-muted': isDisabled}">{{heading}}</span>
        </a>
      </h4>
    </div>
    <div class="panel-collapse collapse" collapse="!isOpen">
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
  `
})
export class AccordionGroup {
  private templateUrl:string;
  private _isOpen:boolean;

  public isDisabled:boolean;
  public heading:string;

  constructor(private accordion:Accordion) {
  }

  onInit() {
    this.accordion.addGroup(this);
  }

  onDestroy() {
    this.accordion.removeGroup(this);
  }

  public toggleOpen() {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }

  public get isOpen():boolean {
    return this._isOpen;
  }

  public set isOpen(value:boolean) {
    this._isOpen = value;
    if (value) {
      this.accordion.closeOthers(group);
    }
  }
}

@Directive({
  selector: 'accordion-heading, [accordion-heading]'
})
export class AccordionHeading {
  constructor(private group:AccordionGroup, private el:ElementRef) {
    group.heading = el.nativeElement.innerHTML;
  }
}


// todo: accordion transclude looks like uneeded hack
