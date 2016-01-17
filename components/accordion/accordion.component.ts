import {Component, Input, HostBinding} from 'angular2/core';

import {AccordionPanel} from './accordion-group.component';

// todo: support template url
@Component({
  selector: 'accordion',
  template: `<ng-content></ng-content>`
})
export class Accordion {
  @Input() public closeOthers:boolean;

  @HostBinding('class.panel-group')
  private addClass = true;

  constructor() {
  }

  private groups:Array<AccordionPanel> = [];

  public closeOtherPanels(openGroup:AccordionPanel) {
    if (!this.closeOthers) {
      return;
    }

    this.groups.forEach((group:AccordionPanel) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  public addGroup(group:AccordionPanel) {
    this.groups.push(group);
  }

  public removeGroup(group:AccordionPanel) {
    let index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.slice(index, 1);
    }
  }
}
