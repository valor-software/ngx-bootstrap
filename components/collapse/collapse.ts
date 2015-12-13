import {
  Directive, Input, HostBinding
} from 'angular2/core';

// todo: add animate
// todo: add init and on change
@Directive({ selector: '[collapse]' })
export class Collapse {
  // style
  @HostBinding('style.height')
  private height:string;
  // shown
  @HostBinding('class.in')
  @HostBinding('attr.aria-expanded')
  private isExpanded:boolean = true;
  // hidden
  @HostBinding('attr.aria-hidden')
  private isCollapsed:boolean = false;
  // stale state
  @HostBinding('class.collapse')
  private isCollapse:boolean = true;
  // animation state
  @HostBinding('class.collapsing')
  private isCollapsing:boolean = false;

  @Input()
  private set collapse(value:boolean) {
    this.isExpanded = value;
    this.toggle();
  }

  private get collapse():boolean {
    return this.isExpanded;
  }

  constructor() {
  }

  toggle() {
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  hide() {
    this.isCollapse = false;
    this.isCollapsing = true;

    this.isExpanded = false;
    this.isCollapsed = true;
    setTimeout(() => {
      this.height = '0';
      this.isCollapse = true;
      this.isCollapsing = false;
    }, 4);
  }

  show() {
    this.isCollapse = false;
    this.isCollapsing = true;

    this.isExpanded = true;
    this.isCollapsed = false;
    setTimeout(() => {
      this.height = 'auto';

      this.isCollapse = true;
      this.isCollapsing = false;
    }, 4);
  }
}
