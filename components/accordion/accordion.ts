import {
  Component, Directive,
  OnInit, OnDestroy,
  Inject, Input, HostBinding,
  ViewContainerRef, TemplateRef
} from 'angular2/core';
import { NgClass, NgFor } from 'angular2/common';
import { Collapse } from '../collapse/collapse';

// todo: support template url
@Component({
  selector: 'accordion',
  template: `<ng-content></ng-content>`
})
export class Accordion {
  @Input() private templateUrl:string;
  @Input() private closeOthers:boolean;

  @HostBinding('class.panel-group')
  private addPanelGroupClass = true;

  constructor() {
  }

  private groups:Array<AccordionGroup> = [];

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
  selector: '[accordionTransclude]'
})
export class AccordionTransclude implements OnInit {
  @Input() private accordionTransclude:TemplateRef;

  constructor(@Inject(ViewContainerRef) private viewRef:ViewContainerRef) {
  }

  ngOnInit() {
    if (this.accordionTransclude) {
      this.viewRef.createEmbeddedView(this.accordionTransclude);
    }
  }
}

// todo: support template url
// todo: support custom `open class`
@Component({
  selector: 'accordion-group',
  directives: [Collapse, AccordionTransclude, NgClass],
  template: `
    <div class="panel" [ngClass]="panelClass">
      <div class="panel-heading" (click)="toggleOpen($event)">
        <h4 class="panel-title">
          <a href tabindex="0" class="accordion-toggle">
            <span [ngClass]="{'text-muted': isDisabled}"
              [accordionTransclude]="headingTemplate">{{heading}}</span>
          </a>
        </h4>
      </div>
      <div class="panel-collapse collapse" [collapse]="!isOpen">
        <div class="panel-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class AccordionGroup implements OnInit, OnDestroy {
  @Input() private templateUrl:string;
  @Input() private heading:string;
  @Input() private panelClass:string;
  @Input() public isDisabled:boolean;

  @HostBinding('class.panel-open')
  @Input() public get isOpen():boolean {
    return this._isOpen;
  }

  public set isOpen(value:boolean) {
    this._isOpen = value;
    if (value) {
      this.accordion.closeOtherGroups(this);
    }
  }

  private _isOpen:boolean;
  public headingTemplate:TemplateRef;

  constructor(private accordion:Accordion) {
  }

  ngOnInit() {
    this.panelClass = this.panelClass || 'panel-default';
    this.accordion.addGroup(this);
  }

  ngOnDestroy() {
    this.accordion.removeGroup(this);
  }

  public toggleOpen(event:MouseEvent) {
    event.preventDefault();
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }
}

@Directive({selector: '[accordion-heading]'})
export class AccordionHeading {
  constructor(private group:AccordionGroup, private templateRef:TemplateRef) {
    group.headingTemplate = templateRef;
  }
}

export const ACCORDION_DIRECTIVES:Array<any> = [Accordion, AccordionGroup, AccordionHeading];
// will be deprecated
export const accordion:Array<any> = [Accordion, AccordionGroup, AccordionHeading];
