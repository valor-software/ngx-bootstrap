/*
 todo: general:
 1. Popup
 2. Keyboard support
 3. custom-class attribute support
 4. date-disabled attribute support
 5. template-url attribute support
 */
import {DatePickerPopup} from './datepicker/datepicker-popup';
import {DatePicker} from './datepicker/datepicker';

export {DatePickerPopup} from './datepicker/datepicker-popup';
export {DatePicker} from './datepicker/datepicker';
export const DATEPICKER_DIRECTIVES:Array<any> = [DatePicker, DatePickerPopup];
