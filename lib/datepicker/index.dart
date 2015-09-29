/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Host, EventEmitter, DefaultValueAccessor, ElementRef, ViewContainerRef, NgIf, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES, Self, NgModel, Renderer, QueryList, Query;
import "package:moment.dart" as moment;
/*
todo: general:
1. Popup
2. Keyboard support
3. custom-class attribute support
4. date-disabled attribute support
5. template-url attribute support
 */
import "datepicker-inner.dart" show DatePickerInner;
import "datepicker-popup.dart" show DatePickerPopup;
import "daypicker.dart" show DayPicker;
import "monthpicker.dart" show MonthPicker;
import "yearpicker.dart" show YearPicker;
import "datepicker.dart" show DatePicker;

const List<dynamic> datepicker = [ DatePicker, DatePickerPopup];