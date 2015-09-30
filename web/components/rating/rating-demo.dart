/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES;
import "../../../lib/index.dart" show Rating;

// webpack html imports
var template = require("./rating-demo.html");

@Component(selector: "rating-demo")
@View(
    template: template,
    directives: const [
      Rating,
      NgClass,
      NgStyle,
      FORM_DIRECTIVES,
      CORE_DIRECTIVES
    ])
class RatingDemo {
  num x = 5;
  num y = 2;
  num max = 10;
  num rate = 7;
  bool isReadonly = false;
  num overStar;
  num percent;
  dynamic ratingStates = [
    {"stateOn": "glyphicon-ok-sign", "stateOff": "glyphicon-ok-circle"},
    {"stateOn": "glyphicon-star", "stateOff": "glyphicon-star-empty"},
    {"stateOn": "glyphicon-heart", "stateOff": "glyphicon-ban-circle"},
    {"stateOn": "glyphicon-heart"},
    {"stateOff": "glyphicon-off"}
  ];
  void hoveringOver(num value) {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  }

  resetStar() {
    this.overStar = null;
  }
}
