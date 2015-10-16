import {
  Component, View,
  Directive,
  EventEmitter, ElementRef
} from 'angular2/angular2';

// todo: add animate
// todo: add init and on change
@Directive({
  selector: '[collapse]',
  properties: ['collapse'],
  host: {
    '[class.in]': 'isExpanded',
    '[class.collapse]': 'isCollapse',
    '[class.collapsing]': 'isCollapsing',
    '[attr.aria-expanded]': 'isExpanded',
    '[attr.aria-hidden]': 'isCollapsed',
    '[style.height]': 'height'
  }
})
export class Collapse {
  public test:any = 'wtf';
  // style
  private height:string;
  // classes
  // shown
  private isExpanded:boolean = true;
  // hidden
  private isCollapsed:boolean = false;
  // stale state
  private isCollapse:boolean = true;
  // animation state
  private isCollapsing:boolean = false;

  constructor(private el:ElementRef) {
  }

  private get collapse():boolean {
    return this.isExpanded;
  }

  private set collapse(value:boolean) {
    this.isExpanded = value;
    this.toggle();
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
