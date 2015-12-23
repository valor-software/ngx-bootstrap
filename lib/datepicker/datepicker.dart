part of ns_datepicker;

@Component (selector: "n2s-datepicker",
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
    <n2s-datepicker-inner [activeDate]="activeDate"
                      (update)="onUpdate(\$event)"
                      [datepicker-mode]="datepickerMode"
                      [initDate]="initDate"
                      [minDate]="minDate"
                      [maxDate]="maxDate"
                      [minDode]="minMode"
                      [maxDode]="maxMode"
                      [showDeeks]="showWeeks"
                      [formatDay]="formatDay"
                      [formatMonth]="formatMonth"
                      [formatYear]="formatYear"
                      [formatDayHeader]="formatDayHeader"
                      [formatDayTitle]="formatDayTitle"
                      [formatMonthTitle]="formatMonthTitle"
                      [startingDay]="startingDay"
                      [yearRange]="yearRange"
                      [customClass]="customClass"
                      [dateDisabled]="dateDisabled"
                      [templateUrl]="templateUrl"
                      [shortcutPropagation]="shortcutPropagation">
      <n2s-daypicker tabindex="0"></n2s-daypicker>
      <n2s-monthpicker tabindex="0"></n2s-monthpicker>
      <n2s-yearpicker tabindex="0"></n2s-yearpicker>
    </n2s-datepicker-inner>
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

  DateTime get activeDate => _activeDate;

  set activeDate(DateTime value) {
    _activeDate = value;
    cd.viewToModelUpdate(this.activeDate.toString());
  }

  onUpdate(event) {
    this.writeValue(event);
  }

  writeValue(dynamic value) {
    if (value != null) {
      if (value is String) {
        value = DateTime.parse(value);
      }
      activeDate = value;
    }
  }
}