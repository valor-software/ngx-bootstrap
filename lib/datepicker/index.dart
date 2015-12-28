library ns_datepicker;

import "package:angular2/angular2.dart";
import "package:angular2/src/core/di.dart";
import "package:ng2_strap/position.dart";
import "datepicker-inner.dart";
import "daypicker.dart";
import "monthpicker.dart";
import "yearpicker.dart";
import 'dart:async';
//import 'package:intl/intl.dart';

part "package:ng2_strap/datepicker/datepicker-popup.dart";
part "package:ng2_strap/datepicker/datepicker.dart";
/*
todo: general:
1. Popup
2. Keyboard support
3. custom-class attribute support
4. date-disabled attribute support
5. template-url attribute support
 */

const List<dynamic> DATEPICKER_DIRECTIVES = const [DatePicker, DatePickerPopup];