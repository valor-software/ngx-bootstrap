import {
  ComponentRef, Directive, ElementRef, EventEmitter, Input, OnChanges,
  OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewContainerRef
} from '@angular/core';

import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsDaterangepickerInlineConfig } from './bs-daterangepicker-inline.config';
import { BsDaterangepickerInlineContainerComponent } from './themes/bs/bs-daterangepicker-inline-container.component';
import { DatepickerDateCustomClasses } from './models';
import {
  checkBsValue,
  checkRangesWithMaxDate,
  setDateRangesCurrentTimeOnDateSelect
} from './utils/bs-calendar-utils';

@Directive({
    selector: 'bs-daterangepicker-inline',
    exportAs: 'bsDaterangepickerInline'
})
export class BsDaterangepickerInlineDirective implements OnInit, OnDestroy, OnChanges {
    _bsValue?: Date[];
    /**
     * Initial value of datepicker
     */
    @Input()
    set bsValue(value: Date[] ) {
      if (this._bsValue === value) {
        return;
      }

      if (value && this.bsConfig?.initCurrentTime) {
        value = setDateRangesCurrentTimeOnDateSelect(value);
      }

      this._bsValue = value;
      this.bsValueChange.emit(value);
    }

    /**
     * Config object for datepicker
     */
    @Input() set bsConfig(value: Partial<BsDaterangepickerInlineConfig>) {
      if (value?.initCurrentTime && value?.initCurrentTime !== this._bsConfig?.initCurrentTime && this._bsValue) {
        this._bsValue = setDateRangesCurrentTimeOnDateSelect(this._bsValue);
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
     * Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays
     */
    @Input() daysDisabled?: number[];
    /**
     * Disable specific dates
     */
    @Input() datesDisabled?: Date[];
    /**
     * Disable specific dates
     */
    @Input() datesEnabled?: Date[];
    /**
     * Emits when daterangepicker value has been changed
     */
    @Output() bsValueChange: EventEmitter<Date[]> = new EventEmitter();

    protected _subs: Subscription[] = [];

    private readonly _datepicker: ComponentLoader<BsDaterangepickerInlineContainerComponent>;
    private _datepickerRef?: ComponentRef<BsDaterangepickerInlineContainerComponent>;
    _bsConfig?: Partial<BsDaterangepickerInlineConfig>;

    constructor(
      public _config: BsDaterangepickerInlineConfig,
      private _elementRef: ElementRef,
      _renderer: Renderer2,
      _viewContainerRef: ViewContainerRef,
      cis: ComponentLoaderFactory
    ) {
      // todo: assign only subset of fields
      Object.assign(this, this._config);
      this._datepicker = cis.createLoader<BsDaterangepickerInlineContainerComponent>(
        _elementRef,
        _viewContainerRef,
        _renderer
      );
    }

    ngOnInit(): void {
        this.setConfig();

        // if date changes from external source (model -> view)
        this._subs.push(
          this.bsValueChange.subscribe((value: Date[]) => {
            if (this._datepickerRef) {
              this._datepickerRef.instance.value = value;
            }
          })
        );

        // if date changes from picker (view -> model)
      if (this._datepickerRef) {
        this._subs.push(
          this._datepickerRef.instance.valueChange
            .pipe(
              filter((range: Date[]) => range && range[0] && !!range[1])
            )
            .subscribe((value: Date[]) => {
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

        if (changes.datesEnabled) {
          this._datepickerRef.instance.datesEnabled = this.datesEnabled;
        }

        if (changes.datesDisabled) {
          this._datepickerRef.instance.datesDisabled = this.datesDisabled;
          this.setConfig();
        }

        if (changes.daysDisabled) {
          this._datepickerRef.instance.daysDisabled = this.daysDisabled;
          this.setConfig();
        }

        if (changes.isDisabled) {
          this._datepickerRef.instance.isDisabled = this.isDisabled;
          this.setConfig();
        }

        if (changes.dateCustomClasses) {
          this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
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
        daysDisabled: this.daysDisabled || this._bsConfig && this._bsConfig.daysDisabled,
        dateCustomClasses: this.dateCustomClasses || this._bsConfig && this._bsConfig.dateCustomClasses,
        datesDisabled: this.datesDisabled || this._bsConfig && this._bsConfig.datesDisabled,
        datesEnabled: this.datesEnabled || this._bsConfig && this._bsConfig.datesEnabled,
        ranges: checkRangesWithMaxDate(this._bsConfig && this._bsConfig.ranges, this.maxDate || this._bsConfig && this._bsConfig.maxDate),
        maxDateRange: this._bsConfig && this._bsConfig.maxDateRange,
        initCurrentTime: this.bsConfig?.initCurrentTime
      });

      this._datepickerRef = this._datepicker
        .provide({provide: BsDatepickerConfig, useValue: this._config})
        .attach(BsDaterangepickerInlineContainerComponent)
        .to(this._elementRef)
        .show();
    }

    ngOnDestroy() {
      this._datepicker.dispose();
    }
}
