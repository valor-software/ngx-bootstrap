part of ns_datepicker;

@Component (selector: "datepicker[ng-model], [datepicker][ng-model]",
    inputs: const [
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
    ],
    template: '''
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
  DatePicker(this.cd, Renderer renderer, ElementRef elementRef)
      : super (renderer, elementRef) {
    cd.valueAccessor = this;
  }

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

  NgModel cd;

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
    if (value != null) {
      if (value is String) {
        value = DateTime.parse(value);
      }
      this.activeDate = value;
    }
  }
}