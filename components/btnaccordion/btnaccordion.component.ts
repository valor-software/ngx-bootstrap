import {Directive, Input, HostBinding, Query, QueryList, OnInit} from 'angular2/core';
import {BtnAccordionGroup} from './btnaccordion-group.component';

@Directive({selector: 'btnaccordion, [btnaccordion]'})
export class BtnAccordion implements OnInit {
  @Input('accordion-class') public accordionClass: string;
  @Input('collapse-others') private onlyOneExpanded: boolean;

  @HostBinding('class')
  private mainClass: string;

  constructor(@Query(BtnAccordionGroup) public groups: QueryList<BtnAccordionGroup>) {}

  ngOnInit() {
    this.accordionClass = this.accordionClass || 'list-group';
    this.mainClass = this.accordionClass;
  }

  collapseOthers(expandedGroup: BtnAccordionGroup): void {
    if (!this.onlyOneExpanded) {
      return;
    }

    this.groups.toArray().forEach((group: BtnAccordionGroup) => {
      if (group !== expandedGroup) {
        group.isExpanded = false;
      }
    });
  }
}
