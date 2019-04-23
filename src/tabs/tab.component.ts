import {
  EventEmitter,
  HostBinding,
  Input,
  Output,
  TemplateRef,
  OnDestroy,
  ElementRef,
  Renderer2,
  Component
} from '@angular/core';
import { TabsetComponent } from './tabset.component';

@Component({
  selector: 'tab',
  template: `
  <div [hidden]="!active" class="pane">
    <ng-content></ng-content>
    <ng-container *ngIf="tabTemplate"
      [ngTemplateOutlet]="tabTemplate"
    >
    </ng-container>
  </div>
  `
})
export class TabComponent implements OnDestroy {
  /** tab header text */
  @Input() heading: string;
  /** tab id. The same id with suffix '-link' will be added to the corresponding &lt;li&gt; element  */
  @HostBinding('attr.id')
  @Input() id: string;
  /** if true tab can not be activated */
  @Input() disabled: boolean;
  /** if true tab can be removable, additional button will appear */
  @Input() removable: boolean;
  /** if set, will be added to the tab's class attribute. Multiple classes are supported. */
  @Input()
  get customClass(): string {
    return this._customClass;
  }
  set customClass(customClass: string) {
    if (this.customClass) {
      this.customClass.split(' ').forEach((cssClass: string) => {
        this.renderer.removeClass(this.elementRef.nativeElement, cssClass);
      });
    }

    this._customClass = customClass ? customClass.trim() : null;

    if (this.customClass) {
      this.customClass.split(' ').forEach((cssClass: string) => {
        this.renderer.addClass(this.elementRef.nativeElement, cssClass);
      });
    }
  }

  @Input() tabTemplate: TemplateRef<any>;

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
    this.selectTab.emit(this);
    this.tabset.tabs.forEach((tab: TabComponent) => {
      if (tab !== this) {
        tab.active = false;
      }
    });
  }

  /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
  @Output() selectTab: EventEmitter<TabComponent> = new EventEmitter();
  /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
  @Output() deselect: EventEmitter<TabComponent> = new EventEmitter();
  /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
  @Output() removed: EventEmitter<TabComponent> = new EventEmitter();

  @HostBinding('class.tab-pane') addClass = true;

  /* tslint:disable-next-line:no-any */
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

  ngOnDestroy(): void {
    this.tabset.removeTab(this, { reselect: false, emit: false });
  }
}
