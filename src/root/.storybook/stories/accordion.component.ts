import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { changeBsVersion } from '../common/changeBsVersion';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'accordion-story',
  template: `
    <div [style.width.%]="width">
      <accordion [isAnimated]="true" [closeOthers]="closeOthers">
        <accordion-group heading="Static Header" [isDisabled]="isDisabled" [isOpen]="isOpen">
          This content is straight in the template.
        </accordion-group>
        <accordion-group heading="Another group with eventListener" (isOpenChange)="isOpenChange.emit($event)">
          <p>Some content</p>
        </accordion-group>
        <accordion-group *ngIf="customHTML; else elseBlock">
          <button class="btn btn-link btn-block clearfix" accordion-heading type="button">
            <div class="pull-left float-left">Another group with custom HTML</div>
            <span class="badge badge-secondary float-right pull-right">Some HTML here</span>
          </button>
          <p>Some content</p>
        </accordion-group>
        <ng-template #elseBlock>
          <accordion-group heading="Another group">
            <p>Some content</p>
          </accordion-group>
        </ng-template>
        <accordion-group [heading]="label" [panelClass]="customClass ? 'customClass' : false">
          <p>Some content</p>
        </accordion-group>
      </accordion>
    </div>
 `
})
export default class AccordionComponent {
  //route accordion--default
  @Input() closeOthers?: boolean;
  @Input() customHTML?: boolean;
  @Input() isDisabled?: boolean;
  @Input() isOpen?: boolean;
  @Input() label?: string;
  @Input() width?: number;
  @Input() customClass?: boolean;
  @Input()
  set bootstrapVersion(value: 4 | 3 | 5) {
    changeBsVersion(value);
  };
  @Output() isOpenChange = new EventEmitter<boolean>();
}

