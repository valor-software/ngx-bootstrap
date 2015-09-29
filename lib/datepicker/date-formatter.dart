import "package:moment.dart" as moment;

class DateFormatter {
  String format(DateTime date, String format) {
    return moment(date.getTime()).format(format);
  }
}