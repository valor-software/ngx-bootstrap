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
import { BsDaterangepickerConfig } from './bs-daterangepicker.config';
import { BsDaterangepickerContainerComponent } from './themes/bs/bs-daterangepicker-container.component';
import { Subscription } from 'rxjs';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { ComponentLoader } from '../component-loader/component-loader.class';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { filter } from 'rxjs/operators';
import { BsCustomDates } from './bs-customdates';

@Directive({
  selector: '[bsDaterangepicker]',
  exportAs: 'bsDaterangepicker'
})
export class BsDaterangepickerDirective
  implements OnInit, OnDestroy, OnChanges {
  /**
   * Placement of a daterangepicker. Accepts: "top", "bottom", "left", "right"
   */
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  @Input() triggers = 'click';
  /**
   * Close daterangepicker on outside click
   */
  @Input() outsideClick = true;
  /**
   * A selector specifying the element the daterangepicker should be appended
   * to. Currently only supports "body".
   */
  @Input() container = 'body';

  /**
   * Returns whether or not the daterangepicker is currently being shown
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
   * Emits an event when the daterangepicker is shown
   */
  @Output() onShown: EventEmitter<any>;
  /**
   * Emits an event when the daterangepicker is hidden
   */
  @Output() onHidden: EventEmitter<any>;

  _bsValue: Date[];
  /**
   * Initial value of daterangepicker
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
   * Config object for daterangepicker
   */
  @Input() bsConfig: Partial<BsDaterangepickerConfig>;
  /**
   * Indicates whether daterangepicker's content is enabled or not
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

  @Input() customDates: BsCustomDates[];
  /**
   * Emits when daterangepicker value has been changed
   */
  @Output() bsValueChange: EventEmitter<Date[]> = new EventEmitter();

  protected _subs: Subscription[] = [];

  private _datepicker: ComponentLoader<BsDaterangepickerContainerComponent>;
  private _datepickerRef: ComponentRef<BsDaterangepickerContainerComponent>;

  constructor(public _config: BsDaterangepickerConfig,
              _elementRef: ElementRef,
              _renderer: Renderer2,
              _viewContainerRef: ViewContainerRef,
              cis: ComponentLoaderFactory) {
    this._datepicker = cis.createLoader<BsDaterangepickerContainerComponent>(
      _elementRef,
      _viewContainerRef,
      _renderer
    );
    Object.assign(this, _config);
    this.onShown = this._datepicker.onShown;
    this.onHidden = this._datepicker.onHidden;
  }

  ngOnInit(): any {
    this._datepicker.listen({
      outsideClick: this.outsideClick,
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

    if (changes.isDisabled) {
      this._datepickerRef.instance.isDisabled = this.isDisabled;
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

    this.setConfig();

    this._datepickerRef = this._datepicker
      .provide({provide: BsDatepickerConfig, useValue: this._config})
      .attach(BsDaterangepickerContainerComponent)
      .to(this.container)
      .position({attachment: this.placement})
      .show({placement: this.placement});

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
          this.hide();
        })
    );
  }

  /**
   * Set config for daterangepicker
   */
  setConfig() {
    this._config = Object.assign(
      {},
      this._config,
      this.bsConfig,
      {
        value: this._bsValue,
        isDisabled: this.isDisabled,
        minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
        maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
        customDates: this.customDates
      }
    );
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

  ngOnDestroy(): any {
    this._datepicker.dispose();
  }
}
