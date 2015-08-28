/// <reference path="../../tsd.d.ts" />

import {
  Component, View, Host,
  LifecycleEvent, EventEmitter,
  DefaultValueAccessor,
  ElementRef, ViewContainerRef,
  NgIf, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES,
  Self, NgModel, Renderer,
  QueryList, Query
} from 'angular2/angular2';

import * as moment from 'moment';

/*
todo: general:
1. Popup
2. Keyboard support
3. custom-class attribute support
4. date-disabled attribute support
5. template-url attribute support
 */
import {DatePickerInner} from './datepicker-inner';
import {DatePickerPopup} from './datepicker-popup';
import {DayPicker} from './daypicker';
import {MonthPicker} from './monthpicker';
import {YearPicker} from './yearpicker';
import {DatePicker} from './datepicker';

export const datepicker:Array<any> = [DatePickerInner, DatePickerPopup, DayPicker, MonthPicker, YearPicker, DatePicker];
