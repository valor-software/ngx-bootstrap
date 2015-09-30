/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Host, OnInit, EventEmitter, DefaultValueAccessor, ElementRef, ViewContainerRef, NgIf, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES, Self, NgModel, Renderer;
import "package:moment.dart" as moment;
import "date-formatter.dart" show DateFormatter;
import 'package:node_shims/js.dart';
import 'dart:math';

const String FORMAT_DAY = "DD";

const String FORMAT_MONTH = "MMMM";

const String FORMAT_YEAR = "YYYY";

const String FORMAT_DAY_HEADER = "dd";

const String FORMAT_DAY_TITLE = "MMMM YYYY";

const String FORMAT_MONTH_TITLE = "YYYY";

const String DATEPICKER_MODE = "day";

const String MIN_MODE = "day";

const String MAX_MODE = "year";

const bool SHOW_WEEKS = true;

const num STARTING_DAY = 0;

const num YEAR_RANGE = 20;

const DateTime MIN_DATE = null;

const DateTime MAX_DATE = null;

const bool SHORTCUT_PROPAGATION = false;

const DAYS_IN_MONTH = const [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const KEYS = const {
  13 : "enter",
  32 : "space",
  33 : "pageup",
  34 : "pagedown",
  35 : "end",
  36 : "home",
  37 : "left",
  38 : "up",
  39 : "right",
  40 : "down"
};

@Component (selector: "datepicker-inner",
    events: const [ "update"],
    properties: const [
      "activeDate",
      "datepickerMode",
      "initDate",
      "minDate",
      "maxDate",
      "minMode",
      "maxMode",
      "showWeeks",
      "formatDay",
      "formatMonth",
      "formatYear",
      "formatDayHeader",
      "formatDayTitle",
      "formatMonthTitle",
      "startingDay",
      "yearRange",
      "shortcutPropagation",
      "customClass",
      "dateDisabled",
      "templateUrl"
    ])
@View (template: '''
<div [hidden]="!datepickerMode" class="well well-sm bg-faded p-a card" role="application" ><!--&lt;!&ndash;ng-keydown="keydown(\$event)"&ndash;&gt;-->
  <ng-content></ng-content>
</div>
  ''', directives: const [ FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass, NgModel])
class DatePickerInner
    implements OnInit {
  String datepickerMode;

  num startingDay;

  num yearRange;

  dynamic stepDay = {};

  dynamic stepMonth = {};

  dynamic stepYear = {};

  List<String> modes = [ "day", "month", "year"];

  DateFormatter dateFormatter = new DateFormatter ();

  String uniqueId;

  DateTime _initDate;

  DateTime _activeDate;

  String activeDateId;

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

  bool shortcutPropagation;

  // todo: change type during implementation
  dynamic customClass;

  // todo: change type during implementation
  dynamic dateDisabled;

  String templateUrl;

  Function refreshViewHandlerDay;

  Function compareHandlerDay;

  Function refreshViewHandlerMonth;

  Function compareHandlerMonth;

  Function refreshViewHandlerYear;

  Function compareHandlerYear;

  EventEmitter update = new EventEmitter ();

  DateTime get initDate {
    return this._initDate;
  }

  set initDate(DateTime value) {
    this._initDate = value;
  }

  DateTime get activeDate {
    return this._activeDate;
  }

  set activeDate(DateTime value) {
    this._activeDate = value;
    this.refreshView();
  }

  // todo: add formatter value to DateTime object
  onInit() {
    this.formatDay = or(this.formatDay, FORMAT_DAY);
    this.formatMonth = or(this.formatMonth, FORMAT_MONTH);
    this.formatYear = or(this.formatYear, FORMAT_YEAR);
    this.formatDayHeader = or(this.formatDayHeader, FORMAT_DAY_HEADER);
    this.formatDayTitle = or(this.formatDayTitle, FORMAT_DAY_TITLE);
    this.formatMonthTitle = or(this.formatMonthTitle, FORMAT_MONTH_TITLE);
    this.showWeeks = or(this.showWeeks, SHOW_WEEKS);
    this.startingDay = or(this.startingDay, STARTING_DAY);
    this.yearRange = or(this.yearRange, YEAR_RANGE);
    this.shortcutPropagation = or(this.shortcutPropagation, SHORTCUT_PROPAGATION);
    this.datepickerMode = or(this.datepickerMode, DATEPICKER_MODE);
    this.minMode = or(this.minMode, MIN_MODE);
    this.maxMode = or(this.maxMode, MAX_MODE);
    // todo: use date for unique value
    this.uniqueId = "datepicker--${(new Random().nextDouble() * 10000).floor}";
    if (falsey(this.initDate)) {
      this.activeDate = this.initDate;
    } else {
      this.activeDate = new DateTime.now();
    }
    this.update.next(this.activeDate);
    this.refreshView();
  }

  setCompareHandler(Function handler, String type) {
    if (identical(type, "day")) {
      this.compareHandlerDay = handler;
    }
    if (identical(type, "month")) {
      this.compareHandlerMonth = handler;
    }
    if (identical(type, "year")) {
      this.compareHandlerYear = handler;
    }
  }

  num compare(DateTime date1, DateTime date2) {
    if (datepickerMode == "day" && truthy(this.compareHandlerDay)) {
      return this.compareHandlerDay(date1, date2);
    }
    if (datepickerMode == "month" && truthy(this.compareHandlerMonth)) {
      return this.compareHandlerMonth(date1, date2);
    }
    if (datepickerMode == "year" && truthy(this.compareHandlerMonth)) {
      return this.compareHandlerYear(date1, date2);
    }
    return null;
  }

  setRefreshViewHandler(Function handler, String type) {
    if (identical(type, "day")) {
      this.refreshViewHandlerDay = handler;
    }
    if (identical(type, "month")) {
      this.refreshViewHandlerMonth = handler;
    }
    if (identical(type, "year")) {
      this.refreshViewHandlerYear = handler;
    }
  }

  refreshView() {
    if (datepickerMode == "day" && truthy(this.refreshViewHandlerDay)) {
      this.refreshViewHandlerDay();
    }
    if (datepickerMode == "month" && truthy(this.refreshViewHandlerMonth)) {
      this.refreshViewHandlerMonth();
    }
    if (datepickerMode == "year" && truthy(this.refreshViewHandlerYear)) {
      this.refreshViewHandlerYear();
    }
  }

  String dateFilter(DateTime date, String format) {
    return this.dateFormatter.format(date, format);
  }

  bool isActive(dynamic dateObject) {
    if (identical(this.compare(dateObject.date, this.activeDate), 0)) {
      this.activeDateId = dateObject.uid;
      return true;
    }
    return false;
  }

  dynamic createDateObject(DateTime date, String format) {
    dynamic dateObject = {};
    dateObject['date'] = date;
    dateObject['label'] = this.dateFilter(date, format);
    dateObject['selected'] = identical(this.compare(date, this.activeDate), 0);
    dateObject['disabled'] = this.isDisabled(date);
    dateObject['current'] = identical(this.compare(date, new DateTime.now()), 0);
    // todo: do it

    // dateObject['customClass'] = this.customClass({date: date, mode: this.datepickerMode}) || {};
    return dateObject;
  }

  bool isDisabled(DateTime date) {
    // todo: implement dateDisabled attribute
    return ((truthy(this.minDate) && this.compare(date, this.minDate) < 0) ||
        (truthy(this.maxDate) && this.compare(date, this.maxDate) > 0));
  }

  split(List<dynamic> arr, num size) {
    List<dynamic> arrays = [];
    while (arr.length > 0) {
      push(arrays, splice(arr, 0, size));
    }
    return arrays;
  }

  // Fix a hard-reprodusible bug with timezones

  // The bug depends on OS, browser, current timezone and current date

  // i.e.

  // var date = new DateTime(2014, 0, 1);

  // console.log(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());

  // can result in "2013 11 31 23" because of the bug.
  fixTimeZone(DateTime date) {
//    var hours = date.hour;
//    date.hour = hours == 23 ? hours + 2 : 0;
  }

  select(DateTime date) {
    if (identical(this.datepickerMode, this.minMode)) {
      if (falsey(this.activeDate)) {
        this.activeDate = new DateTime (
            0,
            0,
            0,
            0,
            0,
            0,
            0);
      }
      this.activeDate.setFullYear(
          date.getFullYear(), date.getMonth(), date.getDate());
    } else {
      this.activeDate = date;
      this.datepickerMode =
      this.modes [ this.modes.indexOf(this.datepickerMode) - 1 ];
    }
    this.update.next(this.activeDate);
    this.refreshView();
  }

  move(num direction) {
    var expectedStep;
    if (identical(this.datepickerMode, "day")) {
      expectedStep = this.stepDay;
    }
    if (identical(this.datepickerMode, "month")) {
      expectedStep = this.stepMonth;
    }
    if (identical(this.datepickerMode, "year")) {
      expectedStep = this.stepYear;
    }
    if (expectedStep) {
      var year = this.activeDate.getFullYear() +
          direction * (expectedStep.years || 0);
      var month = this.activeDate.getMonth() +
          direction * (expectedStep.months || 0);
      this.activeDate.setFullYear(year, month, 1);
      this.update.next(this.activeDate);
      this.refreshView();
    }
  }

  toggleMode(num direction) {
    direction = or(direction, 1);
    if ((identical(this.datepickerMode, this.maxMode) &&
        identical(direction, 1)) ||
        (identical(this.datepickerMode, this.minMode) &&
            identical(direction, -1))) {
      return;
    }
    this.datepickerMode =
    this.modes [ this.modes.indexOf(this.datepickerMode) + direction ];
    this.refreshView();
  }
}