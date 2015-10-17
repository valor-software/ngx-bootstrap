import "package:angular2/angular2.dart";
import "datepicker-inner.dart";
import 'package:intl/intl.dart';

@Component (selector: "daypicker, [daypicker]")
@View (template: '''
{{datePicker.datepickerMode != 'day'}}
<table [hidden]="datePicker.datepickerMode != 'day' ? 'hidden' : ''" role="grid" aria-labelledby="uniqueId+\'-title\'" aria-activedescendant="activeDateId">
  <thead>
    <tr>
      <th>
        <button type="button" class="btn btn-default btn-secondary btn-sm pull-left" (click)="datePicker.move(-1)" tabindex="-1">
          <i class="glyphicon glyphicon-chevron-left"></i>
        </button>
      </th>
      <th colspan="5" [hidden]="datePicker.showWeeks">
        <button [id]="datePicker.uniqueId + \'-title\'"
                type="button"
                class="btn btn-default btn-secondary btn-sm"
                (click)="datePicker.toggleMode()"
                [disabled]="false"
                [ng-class]="{disabled: false}" tabindex="-1" style="width:100%;">
          <strong>{{monthTitle}}</strong>
        </button>
      </th>
      <th colspan="6" [hidden]="!datePicker.showWeeks">
        <button [id]="datePicker.uniqueId + \'-title\'"
                type="button" class="btn btn-default btn-secondary btn-sm"
                (click)="datePicker.toggleMode()"
                [disabled]="datePicker.datepickerMode == maxMode"
                [ng-class]="{disabled: datePicker.datepickerMode == maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{yearTitle}}</strong>
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
      <th *ng-for="#labelz of labels" class="text-center"><small aria-label="labelz['full']"><b>{{labelz['abbr']}}</b></small></th>
    </tr>
  </thead>
  <tbody>
    <tr *ng-for="#rowz of rows;#index=index">
      <td [hidden]="!datePicker.showWeeks" class="text-center h6"><em>{{ weekNumbers[index] }}</em></td>
      <!--  [ng-class]="dtz['customClass']" -->
      <td *ng-for="#dtz of rowz" class="text-center" role="gridcell" [id]="dtz['uid']">
        <button type="button" style="min-width:100%;" class="btn btn-default btn-sm"
                [ng-class]="{'btn-info': dtz['selected'], active: datePicker.isActive(dtz), disabled: dtz['disabled']}"
                [disabled]="dtz['disabled']"
                (click)="datePicker.select(dtz['date'])" tabindex="-1">
          <span [ng-class]="{'text-muted': dtz['secondary'], 'text-info': dtz['current']}">{{dtz['label']}}</span>
        </button>
      </td>
    </tr>
  </tbody>
</table>
  ''', directives: const [ FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass])
class DayPicker
    implements OnInit {
  DatePickerInner datePicker;

  List labels = [];

  String monthTitle;

  String yearTitle;

  List rows = [];

  List<num> weekNumbers = [];

  String maxMode = 'year';

  DayPicker(this.datePicker);

  /*private getDaysInMonth(year:number, month:number) {
   return ((month === 1) && (year % 4 === 0) &&
   ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
   }*/
  getDates(DateTime startDate, num n) {
    List<DateTime> dates = new List(n);
    var current = startDate;
    var i = 0;
    var date;
    while (i < n) {
      date = current;
      datePicker.fixTimeZone(date);
      dates[i++] = date;
      current = current.add(const Duration(days: 1));
    }
    return dates;
  }

  num getISO8601WeekNumber(DateTime checkDate) {
    // ISO week date weeks start on monday
    // so correct the day number
    var dayNr = (checkDate.weekday + 6) % 7;

    // ISO 8601 states that week 1 is the week
    // with the first thursday of that year.
    // Set the target date to the thursday in the target week
    var thisMonday = checkDate.subtract(new Duration(days:(dayNr)));
    var thisThursday = thisMonday.add(new Duration(days:3));

    // Set the target to the first thursday of the year
    // First set the target to january first
    var firstThursday = new DateTime(checkDate.year, DateTime.JANUARY, 1);

    if(firstThursday.weekday != (DateTime.THURSDAY))
    {
      firstThursday = new DateTime(checkDate.year, DateTime.JANUARY, 1 + ((4 - firstThursday.weekday) + 7) % 7);
    }

    // The weeknumber is the number of weeks between the
    // first thursday of the year and the thursday in the target week
    return (thisThursday.difference(firstThursday).inDays / 7).ceil();
  }

  onInit() {
    datePicker.stepDay = { "months" : 1};
    datePicker.setRefreshViewHandler(() {
      var year = datePicker.activeDate.year;
      var month = datePicker.activeDate.month;
      var firstDayOfMonth = new DateTime (year, month, 1);
      var difference = datePicker.startingDay - firstDayOfMonth.day;
      var numDisplayedFromPreviousMonth = (difference > 0)
          ? 7 - difference
          : -difference;
      var firstDate = firstDayOfMonth;
      if (numDisplayedFromPreviousMonth > 0) {
        //todo luisvt: not sure what to do with next line
//        firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
      }
      // 42 is the number of days on a six-month calendar
      List<DateTime> _days = getDates(firstDate, 42);
      List days = [];
      for (var i = 0; i < 42; i++) {
        var _dateObject = datePicker.createDateObject(_days[i], datePicker.formatDay);
        _dateObject['secondary'] = _days [ i ].month != month;
        _dateObject['uid'] = datePicker.uniqueId + "-" + i.toString();
        days.add(_dateObject);
      }
      labels = [];
      for (var j = 0; j < 7; j ++) {
        labels.add({
          'abbr': datePicker.dateFilter(days[j]['date'], datePicker.formatDayHeader),
          'full': datePicker.dateFilter(days[j]['date'], "EEEE")
        });
      }
      monthTitle = new DateFormat(datePicker.formatMonthTitle).format(datePicker.activeDate);
      yearTitle = new DateFormat(datePicker.formatYear).format(datePicker.activeDate);
      rows = datePicker.split(days, 7);
      if (datePicker.showWeeks) {
        weekNumbers = [];
        var thursdayIndex = (4 + 7 - datePicker.startingDay) % 7,
            numWeeks = rows.length;
        for (var curWeek = 0; curWeek < numWeeks; curWeek ++) {
          weekNumbers.add(getISO8601WeekNumber(rows[curWeek][thursdayIndex]['date']));
        }
      }
    }, "day");
    datePicker.setCompareHandler((date1, date2) {
      var d1 = new DateTime (
          date1.year, date1.month, date1.day);
      var d2 = new DateTime (
          date2.year, date2.month, date2.day);
      return d1.millisecondsSinceEpoch - d2.millisecondsSinceEpoch;
    }, "day");
    datePicker.refreshView();
  }
}