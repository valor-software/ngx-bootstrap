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

@Directive({
    selector: 'bs-daterangepicker-inline',
    exportAs: 'bsDaterangepickerInline'
})
export class BsDaterangepickerInlineDirective implements OnInit, OnDestroy, OnChanges {
    _bsValue: Date[];
    /**
     * Initial value of datepicker
     */
    @Input()
    set bsValue(value: Date[]) {
      if (this._bsValue === value) {
        return;
      }
      this._bsValue = value;
      this.bsValueChange.emit(value);
    }

    /**
     * Config object for datepicker
     */
    @Input() bsConfig: Partial<BsDaterangepickerInlineConfig>;
    /**
     * Indicates whether datepicker is enabled or not
     */
    @Input() isDisabled: boolean;
    /**
     * Minimum date which is available for selection
     */
    @Input() minDate: Date;
    /**
     * Maximum date which is available for selection
     */
    @Input() maxDate: Date;
    /**
     * Date custom classes
     */
    @Input() dateCustomClasses: DatepickerDateCustomClasses[];
    /**
     * Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays
     */
    @Input() daysDisabled?: number[];
    /**
     * Disable specific dates
     */
    @Input() datesDisabled: Date[];
    /**
     * Emits when daterangepicker value has been changed
     */
    @Output() bsValueChange: EventEmitter<Date[]> = new EventEmitter();

    protected _subs: Subscription[] = [];

    private _datepicker: ComponentLoader<BsDaterangepickerInlineContainerComponent>;
    private _datepickerRef: ComponentRef<BsDaterangepickerInlineContainerComponent>;

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
            this._datepickerRef.instance.value = value;
          })
        );

        // if date changes from picker (view -> model)
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

      this._config = Object.assign({}, this._config, this.bsConfig, {
        value: this._bsValue,
        isDisabled: this.isDisabled,
        minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
        maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
        daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
        dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
        datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
        ranges: this.bsConfig && this.bsConfig.ranges
      });


      this._datepickerRef = this._datepicker
        .provide({provide: BsDatepickerConfig, useValue: this._config})
        .attach(BsDaterangepickerInlineContainerComponent)
        .to(this._elementRef)
        .show();
    }

    ngOnDestroy(): any {
      this._datepicker.dispose();
    }
}
