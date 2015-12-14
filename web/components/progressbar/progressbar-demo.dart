import "package:angular2/angular2.dart";
import "package:ng2_strap/progressbar/progressbar.dart";
import 'dart:math';

@Component (selector: "progressbar-demo")
@View (templateUrl: "progressbar-demo.html",
    directives: const [ PROGRESSBAR_DIRECTIVES, CORE_DIRECTIVES, NgStyle])
class ProgressbarDemo {
  num max = 200;

  bool showWarning;

  num dynamic;

  String type;

  List stacked = [];

  ProgressbarDemo() {
    this.random();
    this.randomStacked();
  }

  random() {
    var value = new Random().nextInt(100);
    var type;
    if (value < 25) {
      type = "success";
    } else if (value < 50) {
      type = "info";
    } else if (value < 75) {
      type = "warning";
    } else {
      type = "danger";
    }
    this.showWarning =
    (identical(type, "danger") || identical(type, "warning"));
    this.dynamic = value;
    this.type = type;
  }

  randomStacked() {
    var types = [ "success", "info", "warning", "danger"];
    this.stacked = [];
    var total = 0;
    for (var i = 0, n = new Random().nextInt(5); i < n; i ++) {
      var index = new Random().nextInt(4);
      var value = new Random().nextInt(30);
      total += value;
      this.stacked.add({'value': value, 'max': value, 'type': types[index]});
    }
  }
}