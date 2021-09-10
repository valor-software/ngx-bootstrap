import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsDatepickerViewMode, DatepickerDateCustomClasses, DatepickerDateTooltipText } from './models';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';
import { checkBsValue } from './utils/bs-calendar-utils';

@Directive({
  selector: '[bsDatepicker]',
  exportAs: 'bsDatepicker'
})
export class BsDatepickerDirective implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  /**
   * Placement of a datepicker. Accepts: "top", "bottom", "left", "right"
   */
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  @Input() triggers = 'click';
  /**
   * Close datepicker on outside click
   */
  @Input() outsideClick = true;
  /**
   * A selector specifying the element the datepicker should be appended to.
   */
  @Input() container = 'body';

  @Input() outsideEsc = true;
  /**
   * Emits an event when the datepicker is shown
   */
  @Output() onShown: EventEmitter<unknown>;
  /**
   * Emits an event when the datepicker is hidden
   */
  @Output() onHidden: EventEmitter<unknown>;
  isOpen$: BehaviorSubject<boolean>;
  isDestroy$ = new Subject();
  /**
   * Indicates whether datepicker's content is enabled or not
   */
  @Input() isDisabled = false;
  /**
   * Minimum date which is available for selection
   */
  @Input() minDate?: Date;
  /**
   * Maximum date which is available for selection
   */
  @Input() maxDate?: Date;
  /**
   * Minimum view mode : day, month, or year
   */
  @Input() minMode?: BsDatepickerViewMode;
  /**
   * Disable Certain days in the week
   */
  @Input() daysDisabled?: number[];
  /**
   * Disable specific dates
   */
  @Input() datesDisabled?: Date[];
  /**
   * Enable specific dates
   */
  @Input() datesEnabled?: Date[];
  /**
   * Date custom classes
   */
  @Input() dateCustomClasses?: DatepickerDateCustomClasses[];
  /**
   * Date tooltip text
   */
  @Input() dateTooltipTexts?: DatepickerDateTooltipText[];
  /**
   * Emits when datepicker value has been changed
   */
  @Output() bsValueChange: EventEmitter<Date> = new EventEmitter();
  protected _subs: Subscription[] = [];
  private _datepicker: ComponentLoader<BsDatepickerContainerComponent>;
  private _datepickerRef?: ComponentRef<BsDatepickerContainerComponent>;
  private readonly _dateInputFormat$ = new Subject<string>();

  constructor(public _config: BsDatepickerConfig,
              private  _elementRef: ElementRef,
              private  _renderer: Renderer2,
              _viewContainerRef: ViewContainerRef,
              cis: ComponentLoaderFactory) {
    // todo: assign only subset of fields
    Object.assign(this, this._config);
    this._datepicker = cis.createLoader<BsDatepickerContainerComponent>(
      _elementRef,
      _viewContainerRef,
      _renderer
    );
    this.onShown = this._datepicker.onShown;
    this.onHidden = this._datepicker.onHidden;
    this.isOpen$ = new BehaviorSubject(this.isOpen);
  }

  /**
   * Returns whether or not the datepicker is currently being shown
   */
  @Input()
  get isOpen(): boolean {
    return this._datepicker.isShown;
  }

  set isOpen(value: boolean) {
    this.isOpen$.next(value);
  }

  _bsValue?: Date;

  /**
   * Initial value of datepicker
   */
  @Input()
  set bsValue(value: Date | undefined) {
    if (this._bsValue && value && this._bsValue.getTime() === value.getTime()) {
      return;
    }

    if (!this._bsValue && value) {
      const now = new Date();

      value.setMilliseconds(now.getMilliseconds());
      value.setSeconds(now.getSeconds());
      value.setMinutes(now.getMinutes());
      value.setHours(now.getHours());
    }

    this._bsValue = value;
    this.bsValueChange.emit(value);
  }

  get dateInputFormat$(): Observable<string> {
    return this._dateInputFormat$;
  }

  private _bsConfig?: Partial<BsDatepickerConfig>;

  get bsConfig(): Partial<BsDatepickerConfig> | undefined {
    return this._bsConfig;
  }

  /**
   * Config object for datepicker
   */
  @Input() set bsConfig(bsConfig: Partial<BsDatepickerConfig>| undefined) {
    this._bsConfig = bsConfig;
    this.setConfig();
    this._dateInputFormat$.next(bsConfig && bsConfig.dateInputFormat);
  }

  ngOnInit(): void {
    this._datepicker.listen({
      outsideClick: this.outsideClick,
      outsideEsc: this.outsideEsc,
      triggers: this.triggers,
      show: () => this.show()
    });
    this.setConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this._datepickerRef || !this._datepickerRef.instance) {
      return;
    }

    if (changes.minDate) {
      this._datepickerRef.instance.minDate = this.minDate;
    }

    if (changes.maxDate) {
      this._datepickerRef.instance.maxDate = this.maxDate;
    }

    if (changes.daysDisabled) {
      this._datepickerRef.instance.daysDisabled = this.daysDisabled;
    }

    if (changes.datesDisabled) {
      this._datepickerRef.instance.datesDisabled = this.datesDisabled;
    }

    if (changes.datesEnabled) {
      this._datepickerRef.instance.datesEnabled = this.datesEnabled;
    }

    if (changes.isDisabled) {
      if (this._elementRef?.nativeElement) {
        this._elementRef.nativeElement.setAttribute('readonly', this.isDisabled);
      }
      this._datepickerRef.instance.isDisabled = this.isDisabled;
    }

    if (changes.dateCustomClasses) {
      this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
    }

    if (changes.dateTooltipTexts) {
      this._datepickerRef.instance.dateTooltipTexts = this.dateTooltipTexts;
    }
  }

  ngAfterViewInit(): void {
    this.isOpen$.pipe(
      filter(isOpen => isOpen !== this.isOpen),
      takeUntil(this.isDestroy$)
    )
      .subscribe(() => this.toggle());
  }

  /**
   * Opens an element’s datepicker. This is considered a “manual” triggering of
   * the datepicker.
   */
  show(): void {
    if (this._datepicker.isShown) {
      return;
    }

    this.setConfig();

    this._datepickerRef = this._datepicker
      .provide({ provide: BsDatepickerConfig, useValue: this._config })
      .attach(BsDatepickerContainerComponent)
      .to(this.container)
      .position({ attachment: this.placement })
      .show({ placement: this.placement });

    // if date changes from external source (model -> view)
    this._subs.push(
      this.bsValueChange.subscribe((value: Date) => {
        if (this._datepickerRef) {
          this._datepickerRef.instance.value = value;
        }
      })
    );

    // if date changes from picker (view -> model)
    if (this._datepickerRef) {
      this._subs.push(
        this._datepickerRef.instance.valueChange.subscribe((value: Date) => {
          this.bsValue = value;
          this.hide();
        })
      );
    }
  }

  /**
   * Closes an element’s datepicker. This is considered a “manual” triggering of
   * the datepicker.
   */
  hide(): void {
    if (this.isOpen) {
      this._datepicker.hide();
    }
    for (const sub of this._subs) {
      sub.unsubscribe();
    }

    if (this._config.returnFocusToInput) {
      this._renderer.selectRootElement(this._elementRef.nativeElement).focus();
    }
  }

  /**
   * Toggles an element’s datepicker. This is considered a “manual” triggering
   * of the datepicker.
   */
  toggle(): void {
    if (this.isOpen) {
      return this.hide();
    }

    this.show();
  }

  /**
   * Set config for datepicker
   */
  setConfig(): void {
    this._config = Object.assign({}, this._config, this.bsConfig, {
      value: checkBsValue(this._bsValue, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
      isDisabled: this.isDisabled,
      minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
      maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
      daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
      dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
      dateTooltipTexts: this.dateTooltipTexts || this.bsConfig && this.bsConfig.dateTooltipTexts,
      datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
      datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
      minMode: this.minMode || this.bsConfig && this.bsConfig.minMode
    });
  }

  ngOnDestroy(): void {
    this._datepicker.dispose();
    this.isOpen$.next(false);
    if (this.isDestroy$) {
      this.isDestroy$.next();
      this.isDestroy$.complete();
    }
  }
}
