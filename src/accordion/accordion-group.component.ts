import {
  Component, HostBinding, Inject, Input, OnDestroy, OnInit
} from '@angular/core';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { AccordionComponent } from './accordion.component';

/*
 * ### Accordion heading

 Instead of using `heading` attribute on the `accordion-group`, you can use an `accordion-heading` attribute on `any` element inside of a group that will be used as group's header template.

 * */

@Component({
  selector: 'accordion-group, accordion-panel',
  template: `
<div class="panel card" [ngClass]="panelClass">
  <div class="panel-heading card-header" role="tab" (click)="toggleOpen($event)">
    <div class="panel-title card-title">
      <a href role="button" class="accordion-toggle" [attr.aria-expanded]="isOpen">
        <div *ngIf="heading"[ngClass]="{'text-muted': isDisabled}">{{heading}}</div>
        <ng-content select="[accordion-heading]"></ng-content>
      </a>
    </div>
  </div>
  <div class="panel-collapse collapse" role="tabpanel" [collapse]="!isOpen">
    <div class="panel-body card-block">
      <ng-content></ng-content>
    </div>
  </div>
</div>
  `
})
export class AccordionPanelComponent implements OnInit, OnDestroy {
  /** Clickable text in accordion's group header, check `accordion heading` below for using html in header */
  @Input() public heading: string;
  /** Provides an ability to use Bootstrap's contextual panel classes (`panel-primary`, `panel-success`, `panel-info`, etc...). List of all available classes [link](http://getbootstrap.com/components/#panels-alternatives) */
  @Input() public panelClass: string;
  /** if <code>true</code> — disables accordion group */
  @Input() public isDisabled: boolean;

  // Questionable, maybe .panel-open should be on child div.panel element?
  /** Is accordion group open or closed */
  @HostBinding('class.panel-open')
  @Input()
  public get isOpen(): boolean {
    return this._isOpen;
  }

  public set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      this.accordion.closeOtherPanels(this);
    }
  }

  public get isBs3(): boolean {
    return isBs3();
  }

  protected _isOpen: boolean;
  protected accordion: AccordionComponent;

  public constructor(@Inject(AccordionComponent) accordion: AccordionComponent) {
    this.accordion = accordion;
  }

  public ngOnInit(): any {
    this.panelClass = this.panelClass || 'panel-default';
    this.accordion.addGroup(this);
  }

  public ngOnDestroy(): any {
    this.accordion.removeGroup(this);
  }

  public toggleOpen(event: Event): any {
    event.preventDefault();
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }
}
