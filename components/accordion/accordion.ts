/// <reference path="../../tsd.d.ts" />

import {
  Component, View,
  Directive, LifecycleEvent,
  NgClass, ViewContainerRef, TemplateRef
} from 'angular2/angular2';

import {Ng2BootstrapConfig} from '../ng2-bootstrap-config';

console.log(Ng2BootstrapConfig.theme);

// todo: support template url
@Component({
  selector: 'accordion, [accordion]',
  properties: [
    'templateUrl',
    'bCloseOthers: closeOthers'
  ]
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
  private bCloseOthers:any;
  private groups:Array<any> = [];

  constructor() {
  }

  public closeOthers(openGroup:AccordionGroup) {
    if (!this.bCloseOthers) {
      return;
    }

    this.groups.forEach((group:AccordionGroup) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  public addGroup(group:AccordionGroup) {
    this.groups.push(group);
  }

  public removeGroup(group:AccordionGroup) {
    let index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.slice(index, 1);
    }
  }
}

@Directive({
  selector: 'accordion-transclude, [accordion-transclude]',
  properties: ['headingTemplate: accordion-transclude'],
  lifecycle: [LifecycleEvent.onInit]
})
export class AccordionTransclude {
  private headingTemplate: TemplateRef;

  constructor(private viewRef: ViewContainerRef) {
  }

  onInit() {
    if (this.headingTemplate) {
      this.viewRef.createEmbeddedView(this.headingTemplate);
    }
  }
}

import {Collapse} from '../collapse/collapse';
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
          (^click)="toggleOpen($event)">
          <span [ng-class]="{'text-muted': isDisabled}"
            [accordion-transclude]="headingTemplate">{{heading}}</span>
        </a>
      </h4>
    </div>
    <div class="panel-collapse collapse" [collapse]="!isOpen">
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
  `,
  directives: [Collapse, AccordionTransclude, NgClass]
})
export class AccordionGroup {
  private templateUrl:string;
  private _isOpen:boolean;

  public isDisabled:boolean;
  public headingTemplate:any;
  // public templateRef: any;

  constructor(private accordion:Accordion) {
  }

  onInit() {
    this.accordion.addGroup(this);
  }

  onDestroy() {
    this.accordion.removeGroup(this);
  }

  public toggleOpen(event:MouseEvent) {
    event.preventDefault();
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
      this.accordion.closeOthers(this);
    }
  }
}

@Directive({
  selector: 'accordion-heading, [accordion-heading]'
})
export class AccordionHeading {
  constructor(private group:AccordionGroup, private templateRef: TemplateRef) {
    group.headingTemplate = templateRef;
  }
}

export const accordion:Array<any> = [
  Accordion, AccordionGroup,
  AccordionHeading, AccordionTransclude];
