import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter, HostBinding,
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
import { copyTime } from './utils/copy-time-utils';
import { checkBsValue, setCurrentTimeOnDateSelect } from './utils/bs-calendar-utils';

export let previousDate: Date | Date[] | undefined;

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

  @HostBinding ('attr.readonly') get readonlyValue () {
    return this.isDisabled ? '' : null;
  }

  protected _subs: Subscription[] = [];
  private _datepicker: ComponentLoader<BsDatepickerContainerComponent>;
  private _datepickerRef?: ComponentRef<BsDatepickerContainerComponent>;
  private readonly _dateInputFormat$ = new Subject<string | undefined>();
  private _externalValue?: Date;
  private _unappliedValue?: Date;

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

    if (!this._bsValue && value && !this._config.withTimepicker) {
      const now = new Date();
      copyTime(value, now);
    }

    if (value && this.bsConfig?.initCurrentTime) {
      value = setCurrentTimeOnDateSelect(value);
    }

    this.initPreviousValue();
    this._bsValue = value;

    this.bsValueChange.emit(value);
  }

  get dateInputFormat$(): Observable<string | undefined> {
    return this._dateInputFormat$;
  }

  /**
   * Config object for datepicker
   */
  @Input() bsConfig?: Partial<BsDatepickerConfig>;

  ngOnInit(): void {
    this._datepicker.listen({
      outsideClick: this.outsideClick,
      outsideEsc: this.outsideEsc,
      triggers: this.triggers,
      show: () => this.show()
    });
    this.setConfig();
    this.initPreviousValue();
  }

  initPreviousValue() {
    previousDate = this._bsValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["bsConfig"]) {
      if (changes["bsConfig"].currentValue?.initCurrentTime && changes["bsConfig"].currentValue?.initCurrentTime !== changes["bsConfig"].previousValue?.initCurrentTime && this._bsValue) {
        this.initPreviousValue();
        this._bsValue = setCurrentTimeOnDateSelect(this._bsValue);
        this.bsValueChange.emit(this._bsValue);
      }

      this.setConfig();
      this._dateInputFormat$.next(this.bsConfig && this.bsConfig.dateInputFormat);
    }

    if (!this._datepickerRef || !this._datepickerRef.instance) {
      return;
    }

    if (changes["minDate"]) {
      this._datepickerRef.instance.minDate = this.minDate;
    }

    if (changes["maxDate"]) {
      this._datepickerRef.instance.maxDate = this.maxDate;
    }

    if (changes["daysDisabled"]) {
      this._datepickerRef.instance.daysDisabled = this.daysDisabled;
    }

    if (changes["datesDisabled"]) {
      this._datepickerRef.instance.datesDisabled = this.datesDisabled;
    }

    if (changes["datesEnabled"]) {
      this._datepickerRef.instance.datesEnabled = this.datesEnabled;
    }

    if (changes["isDisabled"]) {
      this._datepickerRef.instance.isDisabled = this.isDisabled;
    }

    if (changes["dateCustomClasses"]) {
      this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
    }

    if (changes["dateTooltipTexts"]) {
      this._datepickerRef.instance.dateTooltipTexts = this.dateTooltipTexts;
    }
  }

  initSubscribes() {
    // if date changes from external source (model -> view)
    this._subs.push(
      this.bsValueChange.subscribe((value: Date) => {
        if (this._datepickerRef) {
          this._externalValue = value;
          this._datepickerRef.instance.value = value;
        }
      })
    );

    // if date changes from picker (view -> model)
    if (this._datepickerRef) {

      if(!this.bsConfig?.showApplyButton){
        this._subs.push(
          this._datepickerRef.instance.valueChange.subscribe((value: Date) => {
            this.initPreviousValue();
            this.bsValue = value;
            if (this.keepDatepickerModalOpened()) {
              return;
            }

            this.hide();
          })
        );
      }
      
      // if apply button is shown update unappliedValue
      if(this.bsConfig?.showApplyButton){
        this._subs.push(
          this._datepickerRef.instance.valueChange.subscribe((value: Date) => {
            this._unappliedValue = value;
          })
        );

        // if apply button is pressed update external source (view -> model)
        this._subs.push(
          this._datepickerRef.instance.valueApplied.subscribe(() => {
            this.bsValue = this._unappliedValue;
            
            this.hide();
          })
        );

        // if cancel is pressed reset picker value to external value
        this._subs.push(
          this._datepickerRef.instance.valueCancelled.subscribe(() => {
            if (this._datepickerRef) {
              this._datepickerRef.instance.value = this._externalValue;
            }          
              
            this.hide();
          })
        );
      }
    }
  }

  keepDatepickerModalOpened(): boolean {

    if (!previousDate || !this.bsConfig?.keepDatepickerOpened || !this._config.withTimepicker) {
      return false;
    }

    return this.isDateSame();
  }

  isDateSame(): boolean {
    return (previousDate instanceof Date
      && (this._bsValue?.getDate() === previousDate?.getDate())
      && (this._bsValue?.getMonth() === previousDate?.getMonth())
      && (this._bsValue?.getFullYear() === previousDate?.getFullYear()));
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

    this.initSubscribes();
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
      value: this._config.keepDatesOutOfRules ? this._bsValue : checkBsValue(this._bsValue, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
      isDisabled: this.isDisabled,
      minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
      maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
      daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
      dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
      dateTooltipTexts: this.dateTooltipTexts || this.bsConfig && this.bsConfig.dateTooltipTexts,
      datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
      datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
      minMode: this.minMode || this.bsConfig && this.bsConfig.minMode,
      initCurrentTime: this.bsConfig?.initCurrentTime,
      keepDatepickerOpened: this.bsConfig?.keepDatepickerOpened,
      keepDatesOutOfRules: this.bsConfig?.keepDatesOutOfRules
    });
  }

  unsubscribeSubscriptions() {
    if (this._subs?.length) {
      this._subs.map(sub => sub.unsubscribe());
      this._subs.length = 0;
    }
  }

  ngOnDestroy(): void {
    this._datepicker.dispose();
    this.isOpen$.next(false);
    if (this.isDestroy$) {
      this.isDestroy$.next(null);
      this.isDestroy$.complete();
    }
    this.unsubscribeSubscriptions();
  }
}
