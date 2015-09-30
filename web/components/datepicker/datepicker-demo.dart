/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES;
import "package:moment.dart" as moment;
import "../../../lib/index.dart" show datepicker;

// webpack html imports
var template = require("./datepicker-demo.html");

@Component(selector: "datepicker-demo")
@View(
    template: template,
    directives: const [datepicker, CORE_DIRECTIVES, FORM_DIRECTIVES])
class DatepickerDemo {
  Date dt = new Date();
  Date minDate = null;
  Array<dynamic> events;
  Date tomorrow;
  Date afterTomorrow;
  Array<String> formats = [
    "DD-MM-YYYY",
    "YYYY/MM/DD",
    "DD.MM.YYYY",
    "shortDate"
  ];
  var format = this.formats[0];
  dynamic dateOptions = {"formatYear": "YY", "startingDay": 1};
  bool opened = false;
  DatepickerDemo() {
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    this.events = [
      {"date": this.tomorrow, "status": "full"},
      {"date": this.afterTomorrow, "status": "partially"}
    ];
  }
  today() {
    this.dt = new Date();
  }

  d20090824() {
    this.dt = moment("2009-08-24", "YYYY-MM-DD").toDate();
  }

  // todo: implement custom class cases
  getDayClass(date, mode) {
    if (identical(mode, "day")) {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
      for (var i = 0; i < this.events.length; i++) {
        var currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);
        if (identical(dayToCheck, currentDay)) {
          return this.events[i].status;
        }
      }
    }
    return "";
  }

  bool disabled(Date date, String mode) {
    return (identical(mode, "day") &&
        (identical(date.getDay(), 0) || identical(date.getDay(), 6)));
  }

  open() {
    this.opened = !this.opened;
  }

  clear() {
    this.dt = null;
  }

  toggleMin() {
    this.dt = this.minDate;
  }
}
