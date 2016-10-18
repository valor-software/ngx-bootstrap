import {
  Component, HostBinding, Inject, Input, OnDestroy, OnInit
} from '@angular/core';

import { AccordionComponent } from './accordion.component';

/* tslint:disable-next-line */
const MouseEvent = (global as any).MouseEvent as MouseEvent;

/* tslint:disable:component-selector-name */
@Component({
  selector: 'accordion-group, accordion-panel',
  template: `
    <div class="panel" [ngClass]="panelClass">
      <div class="panel-heading" (click)="toggleOpen($event)">
        <h4 class="panel-title">
          <a href tabindex="0" class="accordion-toggle">
            <span *ngIf="heading" [ngClass]="{'text-muted': isDisabled}">{{heading}}</span>
            <ng-content select="[accordion-heading]"></ng-content>
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
export class AccordionPanelComponent implements OnInit, OnDestroy {
  @Input() public heading:string;
  @Input() public panelClass:string;
  @Input() public isDisabled:boolean;

  // Questionable, maybe .panel-open should be on child div.panel element?
  @HostBinding('class.panel-open')
  @Input()
  public get isOpen():boolean {
    return this._isOpen;
  }

  public set isOpen(value:boolean) {
    this._isOpen = value;
    if (value) {
      this.accordion.closeOtherPanels(this);
    }
  }

  private _isOpen:boolean;
  private accordion:AccordionComponent;

  public constructor(@Inject(AccordionComponent) accordion:AccordionComponent) {
    this.accordion = accordion;
  }

  public ngOnInit():any {
    this.panelClass = this.panelClass || 'panel-default';
    this.accordion.addGroup(this);
  }

  public ngOnDestroy():any {
    this.accordion.removeGroup(this);
  }

  public toggleOpen(event:MouseEvent):any {
    event.preventDefault();
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }
}
