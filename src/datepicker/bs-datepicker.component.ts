import {
  ComponentRef, Directive, ElementRef, EventEmitter, Input,
  OnDestroy, OnInit, Output, Renderer2, ViewContainerRef
} from '@angular/core';
import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { OnChange } from 'ngx-bootstrap/utils';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';
import { Subject, merge, BehaviorSubject } from 'rxjs';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsDatepickerViewMode, DatepickerDateCustomClasses } from './models';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[bsDatepicker]',
  exportAs: 'bsDatepicker'
})
export class BsDatepickerDirective implements OnInit, OnDestroy {
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
   * Returns whether or not the datepicker is currently being shown
   */
  @Input()
  get isOpen(): boolean {
    return this._datepicker.isShown;
  }

  set isOpen(value: boolean) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Emits an event when the datepicker is shown
   */
  /* tslint:disable-next-line: no-any*/
  @Output() onShown: EventEmitter<any>;
  /**
   * Emits an event when the datepicker is hidden
   */
  /* tslint:disable-next-line: no-any*/
  @Output() onHidden: EventEmitter<any>;

  _bsValue: Date;
  /**
   * Initial value of datepicker
   */
  @Input()
  set bsValue(value: Date) {
    if (this._bsValue && value && this._bsValue.getTime() === value.getTime()) {
      return;
    }
    this._bsValue = value;
    this.bsValueChange.emit(value);
    this.config$.next({...this._config, value });
  }

  /**
   * Config object for datepicker
   */
  @Input()
  @OnChange('setConfig')
  bsConfig: Partial<BsDatepickerConfig>;

  bsConfigChange: EventEmitter<Partial<BsDatepickerConfig>> = new EventEmitter();
  /**
   * Indicates whether datepicker's content is enabled or not
   */
  @Input()
  @OnChange('updateConfigProperty')
  isDisabled: boolean;
  /**
   * Minimum date which is available for selection
   */
  @Input()
  @OnChange('updateConfigProperty')
  minDate: Date;
  /**
   * Maximum date which is available for selection
   */
  @Input()
  @OnChange('updateConfigProperty')
  maxDate: Date;

  /**
   * Minimum view mode : day, month, or year
   */
  @Input()
  @OnChange('updateConfigProperty')
  minMode: BsDatepickerViewMode;

  /**
   * Disable Certain days in the week
   */
  @Input()
  @OnChange('updateConfigProperty')
  daysDisabled: number[];

  /**
   * Disable specific dates
   */
  @Input()
  @OnChange('updateConfigProperty')
  datesDisabled: Date[];
  /**
   * Date custom classes
   */
  @Input()
  @OnChange('updateConfigProperty')
  dateCustomClasses: DatepickerDateCustomClasses[];
  /**
   * Emits when datepicker value has been changed
   */
  @Output() bsValueChange: EventEmitter<Date> = new EventEmitter();

  config$: BehaviorSubject<BsDatepickerConfig>;

  get _config() {
    return this.config$.getValue();
  }

  private _datepicker: ComponentLoader<BsDatepickerContainerComponent>;
  private _datepickerRef: ComponentRef<BsDatepickerContainerComponent>;
  private _destroy$: Subject<void>;

  constructor(private _initialConfig: BsDatepickerConfig,
              _elementRef: ElementRef,
              _renderer: Renderer2,
              _viewContainerRef: ViewContainerRef,
              cis: ComponentLoaderFactory) {
    // todo: assign only subset of fields
    Object.assign(this, this._initialConfig);
    this.config$ = new BehaviorSubject(this._initialConfig);
    this._datepicker = cis.createLoader<BsDatepickerContainerComponent>(
      _elementRef,
      _viewContainerRef,
      _renderer
    );
    this.onShown = this._datepicker.onShown;
    this.onHidden = this._datepicker.onHidden;
  }

  ngOnInit(): void {
    this._destroy$ = new Subject();
    this._datepicker.listen({
      outsideClick: this.outsideClick,
      outsideEsc: this.outsideEsc,
      triggers: this.triggers,
      show: () => this.show()
    });
  }

  updateConfigProperty(value: any, prevValue: any, propertyKey: string) {
    const _value = typeof value !== 'boolean' ?
      value || this.bsConfig && this.bsConfig[prevValue] :
      value;
    if (_value !== prevValue) {
      this.config$.next({...this._config, [propertyKey]: _value});
    }
    if (
      this._datepickerRef &&
      this._datepickerRef.instance &&
      this._config.hasOwnProperty(propertyKey)
    ) {
      this._datepickerRef.instance[propertyKey] = value;
    }
  }

  /**
   * Opens an element’s datepicker. This is considered a “manual” triggering of
   * the datepicker.
   */
  show(): void {
    if (this._datepicker.isShown) {
      return;
    }

    this._datepickerRef = this._datepicker
      .provide({provide: BsDatepickerConfig, useValue: this._config})
      .attach(BsDatepickerContainerComponent)
      .to(this.container)
      .position({attachment: this.placement})
      .show({placement: this.placement});

    const autoUnsubscribe = takeUntil(
      merge(this.onHidden, this._destroy$)
    );
    // if date changes from external source (model -> view)
    this.bsValueChange
      .pipe(autoUnsubscribe)
      .subscribe((value: Date) => {
        this._datepickerRef.instance.value = value;
      });

    // if date changes from picker (view -> model)
    this._datepickerRef.instance.valueChange
      .pipe(autoUnsubscribe)
      .subscribe((value: Date) => {
        this.bsValue = value;
        this.hide();
      });
  }

  /**
   * Closes an element’s datepicker. This is considered a “manual” triggering of
   * the datepicker.
   */
  hide(): void {
    if (this.isOpen) {
      this._datepicker.hide();
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

  setConfig(): void {
    this.config$.next({
      ...this._initialConfig,
      ...this.bsConfig,
      value: this._bsValue,
      isDisabled: this.isDisabled,
      minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
      maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
      daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
      dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
      datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
      minMode: (this.minMode || this.bsConfig && this.bsConfig.minMode) as BsDatepickerViewMode
    });
  }

  ngOnDestroy(): void {
    this._datepicker.dispose();
    if (this._destroy$) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }
}
