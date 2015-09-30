/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES;
import "../../../lib/index.dart" show Timepicker;

// webpack html imports
var template = require("./timepicker-demo.html");

@Component(selector: "timepicker-demo")
@View(
    template: template,
    directives: const [Timepicker, CORE_DIRECTIVES, FORM_DIRECTIVES])
class TimepickerDemo {
  num hstep = 1;
  num mstep = 15;
  bool ismeridian = true;
  Date mytime = new Date();
  dynamic options = {
    "hstep": [1, 2, 3],
    "mstep": [1, 5, 10, 15, 25, 30]
  };
  void toggleMode() {
    this.ismeridian = !this.ismeridian;
  }

  void update() {
    var d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    this.mytime = d;
  }

  void changed() {
    console.log("Time changed to: " + this.mytime);
  }

  void clear() {
    this.mytime = null;
  }
}
