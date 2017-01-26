import {
  Directive, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer,
  ElementRef, TemplateRef, ViewContainerRef, ChangeDetectionStrategy
} from '@angular/core';

// import { BsCalendarOptionsClass } from '../common/bs-calendar-options.provider';
import { ComponentLoaderFactory, ComponentLoader } from '../../component-loader';
import { BsDatePickerContainer } from './bs-date-picker-container.component';
import { BsDatePickerState } from '../common/bs-date-picker-state.provider';
import { OnChange } from '../../utils/decorators';
import { BsDatePickerOptions } from '../common/bs-date-picker-options.provider';
import { Subscription } from 'rxjs/Subscription';

/**
 * A lightweight, extensible directive for fancy popover creation.
 */
@Directive({
  selector: '[bsDatePickerPopup]',
  exportAs: 'bs-date-picker-popup',
  providers: [BsDatePickerState, BsDatePickerOptions]
})
export class BsDatePickerPopupDirective implements OnInit, OnDestroy {
  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right"
   */
  @Input() public placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  @Input() public triggers: string = 'click';
  /**
   * A selector specifying the element the popover should be appended to.
   * Currently only supports "body".
   */
  @Input() public container: string = 'body';

  /**
   * Returns whether or not the popover is currently being shown
   */
  @Input()
  public get isOpen(): boolean {
    return this._datepicker.isShown;
  }

  public set isOpen(value: boolean) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Emits an event when the popover is shown
   */
  @Output() public onShown: EventEmitter<any>;
  /**
   * Emits an event when the popover is hidden
   */
  @Output() public onHidden: EventEmitter<any>;

  // here will be parsed options and set defaults
  @Input() @OnChange() public config: BsDatePickerOptions;
  public configChange: EventEmitter<BsDatePickerOptions> = new EventEmitter();

  @Input() @OnChange() public bsValue: any;
  @Output() public bsValueChange: EventEmitter<any> = new EventEmitter();

  protected subscriptions: Subscription[] = [];

  private _datepicker: ComponentLoader<BsDatePickerContainer>;

  public constructor(_elementRef: ElementRef,
                     _renderer: Renderer,
                     _viewContainerRef: ViewContainerRef,
                     datePickerOptions: BsDatePickerOptions,
                     _state: BsDatePickerState,
                     cis: ComponentLoaderFactory) {
    this._datepicker = cis
      .createLoader<BsDatePickerContainer>(_elementRef, _viewContainerRef, _renderer)
      .provide({provide: BsDatePickerState, useValue: _state})
      .provide({provide: BsDatePickerOptions, useValue: datePickerOptions});
    // Object.assign(this, _state);
    this.onShown = this._datepicker.onShown;
    this.onHidden = this._datepicker.onHidden;

    this.subscriptions.push(this.configChange.subscribe((v: any) => {
      datePickerOptions.update(v);
    }));

    this.subscriptions.push(_state.selectedDateChange.subscribe((v: any) => {
      if (datePickerOptions.mode !== 'date') {
        return;
      }
      if (v && (!this.bsValue || this.bsValue && v.toDate().getTime() !== this.bsValue.getTime())) {
        this.bsValue = v && v.toDate && v.toDate() || v;
        this.hide();
      }
    }));

    this.bsValue = this.bsValue || [];
    let startDate = this.bsValue[0];
    let endDate = this.bsValue[1];
    let newDate = false;
    this.subscriptions.push(_state.selectedDateChange.subscribe((v: any) => {
      if (datePickerOptions.mode !== 'daterange') {
        return;
      }
      if (v) {
        startDate = v && v.toDate && v.toDate();
      }
    }));

    this.subscriptions.push(_state.selectedEndDateChange.subscribe((v: any) => {
      if (datePickerOptions.mode !== 'daterange') {
        return;
      }

      if (!v || !endDate) {
        newDate = true;
      }

      if (!v) {
        return;
      }

      if (v) {
        endDate = v && v.toDate && v.toDate();
      }

      if (newDate) {
        this.bsValue = [startDate, endDate];
        newDate = false;
        this.hide();
      }
    }));
  }

  /**
   * Opens an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  public show(): void {
    if (this._datepicker.isShown) {
      return;
    }

    this._datepicker
      .attach(BsDatePickerContainer)
      .to(this.container)
      .position({attachment: this.placement})
      .show({});
  }

  /**
   * Closes an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  public hide(): void {
    if (this.isOpen) {
      this._datepicker.hide();
    }
  }

  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  public toggle(): void {
    if (this.isOpen) {
      return this.hide();
    }

    this.show();
  }

  public ngOnInit(): any {
    this._datepicker.listen({
      triggers: this.triggers,
      show: () => this.show()
    });
  }

  public ngOnDestroy(): any {
    this._datepicker.dispose();
    this.subscriptions.forEach((sub: any) => sub.unsubscribe());
  }
}
