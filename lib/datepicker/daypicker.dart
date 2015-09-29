/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Host, Directive, OnInit, EventEmitter, DefaultValueAccessor, ElementRef, ViewContainerRef, NgIf, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES, Self, NgModel, Renderer;
import "../ng2-bootstrap-config.dart"
    show Ng2BootstrapConfig, Ng2BootstrapTheme;
import "datepicker-inner.dart" show DatePickerInner;

const TEMPLATE_OPTIONS = {
:
{
"DAY_BUTTON" : '''
        <button type="button" style="min-width:100%;" class="btn btn-sm"
                [ng-class]="{\'btn-secondary\': !dtz.selected && !datePicker.isActive(dtz), \'btn-info\': dtz.selected || !dtz.selected && datePicker.isActive(dtz), disabled: dtz.disabled}"
                [disabled]="dtz.disabled"
                (click)="datePicker.select(dtz.date)" tabindex="-1">
          <span [ng-class]="{\'text-muted\': dtz.secondary || dtz.current}">{{dtz.label}}</span>
        </button>
    '''
}
, :
{
"DAY_BUTTON" : '''
        <button type="button" style="min-width:100%;" class="btn btn-default btn-sm"
                [ng-class]="{\'btn-info\': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}"
                [disabled]="dtz.disabled"
                (click)="datePicker.select(dtz.date)" tabindex="-1">
          <span [ng-class]="{\'text-muted\': dtz.secondary, \'text-info\': dtz.current}">{{dtz.label}}</span>
        </button>
    '''
}
};

const CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS [ Ng2BootstrapConfig.theme ||
    Ng2BootstrapTheme.BS3 ];

@Component (selector: "daypicker, [daypicker]")
@View (template: '''
<table [hidden]="datePicker.datepickerMode!==\'day\'" role="grid" aria-labelledby="uniqueId+\'-title\'" aria-activedescendant="activeDateId">
  <thead>
    <tr>
      <th>
        <button type="button" class="btn btn-default btn-secondary btn-sm pull-left" (click)="datePicker.move(-1)" tabindex="-1">
          <i class="glyphicon glyphicon-chevron-left"></i>
        </button>
      </th>
      <th colspan="5" [hidden]="datePicker.showWeeks">
        <button [id]="datePicker.uniqueId + \'-title\'"
                type="button" class="btn btn-default btn-secondary btn-sm"
                (click)="datePicker.toggleMode()"
                [disabled]="datePicker.datepickerMode === maxMode"
                [ng-class]="{disabled: datePicker.datepickerMode === maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{title}}</strong>
        </button>
      </th>
      <th colspan="6" [hidden]="!datePicker.showWeeks">
        <button [id]="datePicker.uniqueId + \'-title\'"
                type="button" class="btn btn-default btn-secondary btn-sm"
                (click)="datePicker.toggleMode()"
                [disabled]="datePicker.datepickerMode === maxMode"
                [ng-class]="{disabled: datePicker.datepickerMode === maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{title}}</strong>
        </button>
      </th>
      <th>
        <button type="button" class="btn btn-default btn-secondary btn-sm pull-right" (click)="datePicker.move(1)" tabindex="-1">
          <i class="glyphicon glyphicon-chevron-right"></i>
        </button>
      </th>
    </tr>
    <tr>
      <th [hidden]="!datePicker.showWeeks" class="text-center"></th>
      <th *ng-for="#labelz of labels" class="text-center"><small aria-label="labelz.full"><b>{{labelz.abbr}}</b></small></th>
    </tr>
  </thead>
  <tbody>
    <tr *ng-for="#rowz of rows;#index=index">
      <td [hidden]="!datePicker.showWeeks" class="text-center h6"><em>{{ weekNumbers[index] }}</em></td>
      <!--  [ng-class]="dtz.customClass" -->
      <td *ng-for="#dtz of rowz" class="text-center" role="gridcell" [id]="dtz.uid">
        ${ CURRENT_THEME_TEMPLATE.DAY_BUTTON}
      </td>
    </tr>
  </tbody>
</table>
  ''', directives: const [ FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass])
class DayPicker
    implements OnInit {
  DatePickerInner datePicker;

  List<dynamic> labels = [];

  String title;

  List<dynamic> rows = [];

  List<num> weekNumbers = [];

  DayPicker(this .datePicker) {}

  /*private getDaysInMonth(year:number, month:number) {
   return ((month === 1) && (year % 4 === 0) &&
   ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
   }*/
  getDates(Date startDate, num n) {
    List<Date> dates = new List(n);
    var current = new Date (startDate.getTime());
    var i = 0;
    var date;
    while (i < n) {
      date = new Date (current.getTime());
      this.datePicker.fixTimeZone(date);
      dates [ i ++ ] = date;
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  num getISO8601WeekNumber(Date date) {
    var checkDate = new Date (date.getTime());
    // Thursday
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
    var time = checkDate.getTime();
    // Compare with Jan 1
    checkDate.setMonth(0);
    checkDate.setDate(1);
    return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) +
        1;
  }

  onInit() {
    var self = this;
    this.datePicker.stepDay = { "months" : 1};
    this.datePicker.setRefreshViewHandler(() {
      var year = this.activeDate.getFullYear();
      var month = this.activeDate.getMonth();
      var firstDayOfMonth = new Date (year, month, 1);
      var difference = this.startingDay - firstDayOfMonth.getDay();
      var numDisplayedFromPreviousMonth = (difference > 0)
          ? 7 - difference
          : -difference;
      var firstDate = new Date (firstDayOfMonth.getTime());
      if (numDisplayedFromPreviousMonth > 0) {
        firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
      }
      // 42 is the number of days on a six-month calendar
      List<Date> _days = self.getDates(firstDate, 42);
      List<dynamic> days = [];
      for (var i = 0; i < 42; i ++) {
        var _dateObject = this.createDateObject(_days [ i ], this.formatDay);
        _dateObject.secondary = !identical(_days [ i ].getMonth(), month);
        _dateObject.uid = this.uniqueId + "-" + i;
        days [ i ] = _dateObject;
      }
      self.labels = [];
      for (var j = 0; j < 7; j ++) {
        self.labels [ j ] = {};
        self.labels [ j ].abbr =
            this.dateFilter(days [ j ].date, this.formatDayHeader);
        self.labels [ j ].full = this.dateFilter(days [ j ].date, "EEEE");
      }
      self.title = this.dateFilter(this.activeDate, this.formatDayTitle);
      self.rows = this.split(days, 7);
      if (this.showWeeks) {
        self.weekNumbers = [];
        var thursdayIndex = (4 + 7 - this.startingDay) % 7,
            numWeeks = self.rows.length;
        for (var curWeek = 0; curWeek < numWeeks; curWeek ++) {
          self.weekNumbers.push(self.getISO8601WeekNumber(
              self.rows [ curWeek ] [ thursdayIndex ].date));
        }
      }
    }, "day");
    this.datePicker.setCompareHandler((date1, date2) {
      var d1 = new Date (
          date1.getFullYear(), date1.getMonth(), date1.getDate());
      var d2 = new Date (
          date2.getFullYear(), date2.getMonth(), date2.getDate());
      return d1.getTime() - d2.getTime();
    }, "day");
    this.datePicker.refreshView();
  }
}