/*
todo: general:
1. Popup
2. Keyboard support
3. custom-class attribute support
4. date-disabled attribute support
5. template-url attribute support
 */
//import {DatePickerInner} from './datepicker/datepicker-inner';
import {DatePickerPopup} from './datepicker/datepicker-popup';
//import {DayPicker} from './datepicker/daypicker';
//import {MonthPicker} from './datepicker/monthpicker';
//import {YearPicker} from './datepicker/yearpicker';
import {DatePicker} from './datepicker/datepicker';

export {DatePickerPopup} from './datepicker/datepicker-popup';
export {DatePicker} from './datepicker/datepicker';
export const DATEPICKER_DIRECTIVES:Array<any> = [DatePicker, DatePickerPopup];
