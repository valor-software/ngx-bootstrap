import {
  Component, View,
  Directive, OnInit, OnDestroy,
  NgClass, ViewContainerRef, TemplateRef, Inject
} from 'angular2/angular2';

// todo: support template url
@Component({
  selector: 'accordion, [accordion]',
  properties: ['templateUrl', 'closeOthers'],
  host: {
    '[class.panel-group]': 'true'
  }
})
@View({
  template: `<ng-content></ng-content>`
})
export class Accordion {
  private templateUrl:string;
  private closeOthers:boolean;
  private groups:Array<AccordionGroup> = [];

  constructor() {
  }

  public closeOtherGroups(openGroup:AccordionGroup) {
    if (!this.closeOthers) {
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
  properties: ['accordionTransclude']
})
export class AccordionTransclude implements OnInit {
  private accordionTransclude:TemplateRef;

  constructor(@Inject(ViewContainerRef) private viewRef:ViewContainerRef) {
  }

  onInit() {
    if (this.accordionTransclude) {
      this.viewRef.createEmbeddedView(this.accordionTransclude);
    }
  }
}

import {Collapse} from '../collapse/collapse';
// todo: support template url
// todo: support custom `open class`
@Component({
  selector: 'accordion-group, [accordion-group]',
  properties: ['templateUrl', 'heading', 'isOpen', 'isDisabled', 'panelClass'],
  host: {
    '[class.panel-open]': 'isOpen'
  }
})
@View({
  template: `
  <div class="panel" [ng-class]="panelClass">
    <div class="panel-heading" (click)="toggleOpen($event)">
      <h4 class="panel-title">
        <a href tabindex="0" class="accordion-toggle">
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
export class AccordionGroup implements OnInit, OnDestroy {
  private templateUrl:string;
  private panelClass:string;
  private _isOpen:boolean;

  public isDisabled:boolean;
  public headingTemplate:TemplateRef;

  constructor(private accordion:Accordion) {
  }

  onInit() {
    this.panelClass = this.panelClass || 'panel-default';
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
      this.accordion.closeOtherGroups(this);
    }
  }
}

@Directive({
  selector: 'accordion-heading, [accordion-heading]'
})
export class AccordionHeading {
  constructor(private group:AccordionGroup, private templateRef:TemplateRef) {
    group.headingTemplate = templateRef;
  }
}

export const accordion:Array<any> = [Accordion, AccordionGroup, AccordionHeading];
