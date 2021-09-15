import {
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

import { Subscription } from 'rxjs';
import { BsDatepickerInlineConfig } from './bs-datepicker-inline.config';

import { BsDatepickerConfig } from './bs-datepicker.config';
import { DatepickerDateCustomClasses, DatepickerDateTooltipText } from './models';
import { BsDatepickerInlineContainerComponent } from './themes/bs/bs-datepicker-inline-container.component';
import { checkBsValue, setCurrentTimeOnDateSelect } from './utils/bs-calendar-utils';

@Directive({
  selector: 'bs-datepicker-inline',
  exportAs: 'bsDatepickerInline'
})
export class BsDatepickerInlineDirective implements OnInit, OnDestroy, OnChanges {
  /**
   * Config object for datepicker
   */
  @Input() set bsConfig(value: Partial<BsDatepickerInlineConfig>) {
    if (value?.initCurrentTime && value?.initCurrentTime !== this._bsConfig?.initCurrentTime && this._bsValue) {
      this._bsValue = setCurrentTimeOnDateSelect(this._bsValue);
    }

    this._bsConfig = value;
  };
  /**
   * Indicates whether datepicker is enabled or not
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
   * Date custom classes
   */
  @Input() dateCustomClasses?: DatepickerDateCustomClasses[];
  /**
   * Date tooltip text
   */
  @Input() dateTooltipTexts?: DatepickerDateTooltipText[];
  /**
   * Disable specific dates
   */
  @Input() datesEnabled?: Date[];
  /**
   * Enable specific dates
   */
  @Input() datesDisabled?: Date[];
  /**
   * Emits when datepicker value has been changed
   */
  @Output() bsValueChange: EventEmitter<Date> = new EventEmitter();
  protected _subs: Subscription[] = [];
  private readonly _datepicker: ComponentLoader<BsDatepickerInlineContainerComponent>;
  private _datepickerRef?: ComponentRef<BsDatepickerInlineContainerComponent>;
  _bsConfig?: Partial<BsDatepickerInlineConfig>;

  constructor(
    public _config: BsDatepickerInlineConfig,
    private _elementRef: ElementRef,
    _renderer: Renderer2,
    _viewContainerRef: ViewContainerRef,
    cis: ComponentLoaderFactory
  ) {
    // todo: assign only subset of fields
    Object.assign(this, this._config);
    this._datepicker = cis.createLoader<BsDatepickerInlineContainerComponent>(
      _elementRef,
      _viewContainerRef,
      _renderer
    );
  }

  _bsValue?: Date;

  /**
   * Initial value of datepicker
   */
  @Input()
  set bsValue(value: Date) {
    if (this._bsValue === value) {
      return;
    }

    if (value && this._bsConfig?.initCurrentTime) {
      value = setCurrentTimeOnDateSelect(value);
    }

    this._bsValue = value;
    this.bsValueChange.emit(value);
  }

  ngOnInit(): void {
    this.setConfig();

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
        })
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this._datepickerRef || !this._datepickerRef.instance) {
      return;
    }

    if (changes.minDate) {
      this._datepickerRef.instance.minDate = this.minDate;
      this.setConfig();
    }

    if (changes.maxDate) {
      this._datepickerRef.instance.maxDate = this.maxDate;
      this.setConfig();
    }

    if (changes.datesDisabled) {
      this._datepickerRef.instance.datesDisabled = this.datesDisabled;
      this.setConfig();
    }

    if (changes.datesEnabled) {
      this._datepickerRef.instance.datesEnabled = this.datesEnabled;
      this._datepickerRef.instance.value = this._bsValue;
    }

    if (changes.isDisabled) {
      this._datepickerRef.instance.isDisabled = this.isDisabled;
      this.setConfig();
    }

    if (changes.dateCustomClasses) {
      this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
      this.setConfig();
    }

    if (changes.dateTooltipTexts) {
      this._datepickerRef.instance.dateTooltipTexts = this.dateTooltipTexts;
      this.setConfig();
    }
  }

  /**
   * Set config for datepicker
   */
  setConfig(): void {
    if (this._datepicker) {
      this._datepicker.hide();
    }

    this._config = Object.assign({}, this._config, this._bsConfig, {
      value: checkBsValue(this._bsValue, this.maxDate || this._bsConfig && this._bsConfig.maxDate),
      isDisabled: this.isDisabled,
      minDate: this.minDate || this._bsConfig && this._bsConfig.minDate,
      maxDate: this.maxDate || this._bsConfig && this._bsConfig.maxDate,
      dateCustomClasses: this.dateCustomClasses || this._bsConfig && this._bsConfig.dateCustomClasses,
      dateTooltipTexts: this.dateTooltipTexts || this._bsConfig && this._bsConfig.dateTooltipTexts,
      datesDisabled: this.datesDisabled || this._bsConfig && this._bsConfig.datesDisabled,
      datesEnabled: this.datesEnabled || this._bsConfig && this._bsConfig.datesEnabled,
      initCurrentTime: this._bsConfig?.initCurrentTime
    });


    this._datepickerRef = this._datepicker
      .provide({ provide: BsDatepickerConfig, useValue: this._config })
      .attach(BsDatepickerInlineContainerComponent)
      .to(this._elementRef)
      .show();
  }

  ngOnDestroy() {
    this._datepicker.dispose();
  }
}
