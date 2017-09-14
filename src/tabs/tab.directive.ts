import {
  Directive,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  TemplateRef,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2
} from '@angular/core';
import { TabsetComponent } from './tabset.component';

@Directive({ selector: 'tab, [tab]' })
export class TabDirective implements OnInit, OnDestroy {
  /** tab header text */
  @Input() heading: string;
  /** tab id */
  @Input() id: string;
  /** if true tab can not be activated */
  @Input() disabled: boolean;
  /** if true tab can be removable, additional button will appear */
  @Input() removable: boolean;
  /** if set, will be added to the tab's class atribute */
  @Input()
  get customClass(): string {
    return this._customClass;
  }

  set customClass(customClass: string) {
    if (this._customClass && this._customClass !== customClass) {
      this.renderer.removeClass(
        this.elementRef.nativeElement,
        this._customClass
      );
    }

    this._customClass = customClass;

    if (this._customClass) {
      this.renderer.addClass(
        this.elementRef.nativeElement,
        this._customClass
      );
    }
  }

  /** tab active state toggle */
  @HostBinding('class.active')
  @Input()
  get active(): boolean {
    return this._active;
  }

  set active(active: boolean) {
    if (this._active === active) {
      return;
    }
    if ((this.disabled && active) || !active) {
      if (this._active && !active) {
        this.deselect.emit(this);
        this._active = active;
      }

      return;
    }

    this._active = active;
    this.select.emit(this);
    this.tabset.tabs.forEach((tab: TabDirective) => {
      if (tab !== this) {
        tab.active = false;
      }
    });
  }

  /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
  @Output() select: EventEmitter<TabDirective> = new EventEmitter();
  /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
  @Output() deselect: EventEmitter<TabDirective> = new EventEmitter();
  /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
  @Output() removed: EventEmitter<TabDirective> = new EventEmitter();

  @HostBinding('class.tab-pane') addClass = true;

  headingRef: TemplateRef<any>;
  tabset: TabsetComponent;
  protected _active: boolean;
  protected _customClass: string;

  constructor(
    tabset: TabsetComponent,
    public elementRef: ElementRef,
    public renderer: Renderer2
  ) {
    this.tabset = tabset;
    this.tabset.addTab(this);
  }

  ngOnInit(): void {
    this.removable = this.removable;
  }

  ngOnDestroy(): void {
    this.tabset.removeTab(this, { reselect: false, emit: false });
  }
}
