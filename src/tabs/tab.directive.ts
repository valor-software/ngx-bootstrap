import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  TemplateRef,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  input,
  output,
  effect
} from '@angular/core';
import { TabsetComponent } from './tabset.component';

@Directive({
    selector: 'tab, [tab]', exportAs: 'tab',
    standalone: true
})
export class TabDirective implements OnInit, OnDestroy {
  /** tab header text */
  heading = input<string | undefined>();
  /** tab id. The same id with suffix '-link' will be added to the corresponding &lt;li&gt; element  */
  @HostBinding('attr.id')
  id?: string;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  idInput = input<string | undefined>(undefined, { alias: 'id' });
  /** if true tab can not be activated */
  disabled = false;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  disabledInput = input<boolean>(false, { alias: 'disabled' });
  /** if true tab can be removable, additional button will appear */
  removable = false;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  removableInput = input<boolean>(false, { alias: 'removable' });
  /** tab order for sorting when using dynamic tabs with *ngIf */
  tabOrder?: number;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  tabOrderInput = input<number | undefined>(undefined, { alias: 'tabOrder' });
  /** if set, will be added to the tab's class attribute. Multiple classes are supported. */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  customClassInput = input<string | undefined>(undefined, { alias: 'customClass' });
  /** tab active state - can be set via input */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  activeInput = input<boolean | undefined>(undefined, { alias: 'active' });

  /** tab active state toggle */
  @HostBinding('class.active')
  get active(): boolean | undefined {
    return this._active;
  }

  set active(active: boolean | undefined) {
    if (this._active === active) {
      return;
    }
    if ((this.disabled && active) || !active) {
      if (this._active && !active) {
        this.deselect.emit(this);
        this._active = active;
        this._cdr.markForCheck();
      }

      return;
    }

    this._active = active;
    this._cdr.markForCheck();
    this.selectTab.emit(this);
    this.tabset.tabs.forEach((tab: TabDirective) => {
      if (tab !== this) {
        tab.active = false;
      }
    });
  }

  /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
  selectTab = output<TabDirective>();
  /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
  deselect = output<TabDirective>();
  /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
  removed = output<TabDirective>();

  @HostBinding('class.tab-pane') addClass = true;
  @HostBinding('attr.role') role = 'tabpanel';
  @HostBinding('attr.aria-labelledby') get ariaLabelledby(): string {
    return this.id ? `${this.id}-link` : '';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headingRef?: TemplateRef<any>;
  tabset: TabsetComponent;
  protected _active? = false;
  _customClass = '';

  constructor(
    tabset: TabsetComponent,
    public elementRef: ElementRef,
    public renderer: Renderer2,
    private _cdr: ChangeDetectorRef
  ) {
    this.tabset = tabset;

    // Watch for id input changes
    effect(() => {
      const idValue = this.idInput();
      if (idValue !== undefined) {
        this.id = idValue;
      }
    });

    // Watch for disabled input changes
    effect(() => {
      this.disabled = this.disabledInput();
    });

    // Watch for removable input changes
    effect(() => {
      this.removable = this.removableInput();
    });

    // Watch for tabOrder input changes
    effect(() => {
      this.tabOrder = this.tabOrderInput();
    });

    // Watch for customClass input changes
    effect(() => {
      const customClass = this.customClassInput();

      if (this._customClass) {
        this._customClass.split(' ').forEach((cssClass: string) => {
          this.renderer.removeClass(this.elementRef.nativeElement, cssClass);
        });
      }

      this._customClass = customClass ? customClass.trim() : '';

      if (this._customClass) {
        this._customClass.split(' ').forEach((cssClass: string) => {
          this.renderer.addClass(this.elementRef.nativeElement, cssClass);
        });
      }
    });

    // Watch for active input changes
    effect(() => {
      const activeValue = this.activeInput();
      if (activeValue !== undefined) {
        this.active = activeValue;
      }
    });
  }

  ngOnInit(): void {
    this.removable = !!this.removableInput();
    this.tabOrder = this.tabOrderInput();
    this.disabled = this.disabledInput();
    // Add tab to tabset after input properties are set
    this.tabset.addTab(this);
  }

  ngOnDestroy(): void {
    this.tabset.removeTab(this, { reselect: false, emit: false });
  }
}
