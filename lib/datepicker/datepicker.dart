/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Host, EventEmitter, DefaultValueAccessor, ElementRef, ViewContainerRef, NgIf, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES, Self, NgModel, Renderer, QueryList, Query;
//import "package:moment.dart" as moment;
import 'package:intl/intl.dart';
import "datepicker-inner.dart" show DatePickerInner;
import "datepicker-popup.dart" show DatePickerPopup;
import "daypicker.dart" show DayPicker;
import "monthpicker.dart" show MonthPicker;
import "yearpicker.dart" show YearPicker;

@Component (selector: "datepicker[ng-model], [datepicker][ng-model]",
    properties: const [
      "datepickerMode",
      "minDate",
      "maxDate",
      "dateDisabled",
      "activeDate",
      "showWeeks",
      "startingDay",
      "initDate",
      "minMode",
      "maxMode",
      "formatDay",
      "formatMonth",
      "formatYear",
      "formatDayHeader",
      "formatDayTitle",
      "formatMonthTitle",
      "yearRange",
      "shortcutPropagation"
    ])
@View (template: '''
    <datepicker-inner [active-date]="activeDate"
                      (update)="onUpdate(\$event)"
                      [datepicker-mode]="datepickerMode"
                      [init-date]="initDate"
                      [min-date]="minDate"
                      [max-date]="maxDate"
                      [min-mode]="minMode"
                      [max-mode]="maxMode"
                      [show-weeks]="showWeeks"
                      [format-day]="formatDay"
                      [format-month]="formatMonth"
                      [format-year]="formatYear"
                      [format-day-header]="formatDayHeader"
                      [format-day-title]="formatDayTitle"
                      [format-month-title]="formatMonthTitle"
                      [starting-day]="startingDay"
                      [year-range]="yearRange"
                      [custom-class]="customClass"
                      [date-disabled]="dateDisabled"
                      [template-url]="templateUrl"
                      [shortcut-propagation]="shortcutPropagation">
      <daypicker tabindex="0"></daypicker>
      <monthpicker tabindex="0"></monthpicker>
      <yearpicker tabindex="0"></yearpicker>
    </datepicker-inner>
    ''',
    directives: const [
      DatePickerInner,
      DayPicker,
      MonthPicker,
      YearPicker,
      FORM_DIRECTIVES,
      CORE_DIRECTIVES
    ])
class DatePicker extends DefaultValueAccessor {
  DateTime _activeDate;

  String datepickerMode;

  DateTime initDate;

  DateTime minDate;

  DateTime maxDate;

  String minMode;

  String maxMode;

  bool showWeeks;

  String formatDay;

  String formatMonth;

  String formatYear;

  String formatDayHeader;

  String formatDayTitle;

  String formatMonthTitle;

  num startingDay;

  num yearRange;

  bool shortcutPropagation;

  // todo: change type during implementation
  dynamic customClass;

  // todo: change type during implementation
  dynamic dateDisabled;

  String templateUrl;

  DatePicker(@Self () NgModel cd, Renderer renderer, ElementRef elementRef)
      : super (cd, renderer, elementRef) {
    /* super call moved to initializer */
    ;
  }

  DateTime get activeDate {
    return this._activeDate;
  }

  set activeDate(DateTime value) {
    this._activeDate = value;
    this.cd.viewToModelUpdate(this.activeDate.toString());
  }

  onUpdate(event) {
    this.writeValue(event);
  }

  writeValue(dynamic value) {
    if (value) {
      if (value is! DateTime) {
        value = new DateTime(value);
      }
      this.activeDate = value;
    }
  }
}