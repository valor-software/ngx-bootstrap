import "package:angular2/angular2.dart";
//import "package:moment.dart" as moment;
import "package:ng2-strap/index.dart" show datepicker;

@Component(selector: "datepicker-demo")
@View(
    templateUrl: 'datepicker-demo.html',
    directives: const [datepicker, CORE_DIRECTIVES, FORM_DIRECTIVES])
class DatepickerDemo {
  String dt = new DateTime.now().toIso8601String();
  List<Map> events;
  DateTime tomorrow;
  DateTime afterTomorrow;
  List<String> formats = [
    "DD-MM-YYYY",
    "YYYY/MM/DD",
    "DD.MM.YYYY",
    "shortDate"
  ];
  var format;
  dynamic dateOptions = {"formatYear": "YY", "startingDay": 1};
  bool opened = false;

  DateTime minDate = new DateTime.now().add(new Duration(days: -1000));

  DatepickerDemo() {
    tomorrow = new DateTime.now().add(new Duration(days: 1));
    afterTomorrow = new DateTime.now().add(new Duration(days: 2));
    minDate = new DateTime.now().add(new Duration(days: -1000));
    events = [
      {"date": tomorrow, "status": "full"},
      {"date": afterTomorrow, "status": "partially"}
    ];
    format = formats[0];
  }
  today() {
    dt = new DateTime.now().toIso8601String();
  }

  d20090824() {
    dt = new DateTime(2009, 08, 24).toIso8601String();
  }

  // todo: implement custom class cases
  getDayClass(DateTime date, String mode) {
    if (mode == "day") {
      var dayToCheck = new DateTime(date.year, date.month, date.day);
      for (var event in events) {
        var currentDay = event['date'];
        if (dayToCheck == currentDay) {
          return event['status'];
        }
      }
    }
    return "";
  }

  bool disabled(DateTime date, String mode) {
    return mode == "day" && (date.day == 0 || date.day == 6);
  }

  open() {
    opened = !opened;
  }

  clear() {
    dt = null;
  }

  toggleMin() {
    dt = minDate.toIso8601String();
  }
}
