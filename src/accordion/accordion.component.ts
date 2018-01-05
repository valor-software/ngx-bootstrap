import { Component, Input } from '@angular/core';
import { AccordionPanelComponent } from './accordion-group.component';
import { AccordionConfig } from './accordion.config';

/** Displays collapsible content panels for presenting information in a limited amount of space. */
@Component({
  selector: 'accordion',
  template: `<ng-content></ng-content>`,
  host: {
    '[attr.aria-multiselectable]': 'closeOthers',
    role: 'tablist',
    class: 'panel-group',
    style: 'display: block'
  }
})
export class AccordionComponent {
  /** if `true` expanding one item will close all others */
  @Input() closeOthers: boolean;

  protected groups: AccordionPanelComponent[] = [];

  constructor(config: AccordionConfig) {
    Object.assign(this, config);
  }

  closeOtherPanels(openGroup: AccordionPanelComponent): void {
    if (!this.closeOthers) {
      return;
    }

    this.groups.forEach((group: AccordionPanelComponent) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  addGroup(group: AccordionPanelComponent): void {
    this.groups.push(group);
  }

  removeGroup(group: AccordionPanelComponent): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}
