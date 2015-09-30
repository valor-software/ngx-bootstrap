/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES;
import "../../../lib/index.dart" show ButtonCheckbox, ButtonRadio;

// webpack html imports
var template = require("./buttons-demo.html");

@Component(selector: "buttons-demo")
@View(
    template: template,
    directives: const [
      ButtonCheckbox,
      ButtonRadio,
      CORE_DIRECTIVES,
      FORM_DIRECTIVES
    ])
class ButtonsDemo {
  String singleModel = "1";
  String radioModel = "Middle";
  Object checkModel = {"left": false, "middle": true, "right": false};
}
