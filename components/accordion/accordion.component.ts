import {Component, Input, HostBinding} from 'angular2/core';
import {AccordionPanel} from './accordion-group.component';

// todo: support template url
@Component({
  selector: 'accordion',
  template: `<ng-content></ng-content>`
})
export class Accordion {
  @Input() public closeOthers:boolean;

  /* tslint:disable:no-unused-variable */
  @HostBinding('class.panel-group')
  private addClass:boolean = true;
  /* tslint:enable:no-unused-variable */

  public constructor() {
  }

  private groups:Array<AccordionPanel> = [];

  public closeOtherPanels(openGroup:AccordionPanel):void {
    if (!this.closeOthers) {
      return;
    }

    this.groups.forEach((group:AccordionPanel) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  public addGroup(group:AccordionPanel):void {
    this.groups.push(group);
  }

  public removeGroup(group:AccordionPanel):void {
    let index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}
