/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart" show Component, View, NgFor;
import "../../../lib/index.dart" show Alert;

// webpack html imports
var template = require("./alert-demo.html");

@Component(selector: "alert-demo")
@View(template: template, directives: const [Alert, NgFor])
class AlertDemo {
  Array<Object> alerts = [
    {
      "type": "danger",
      "msg": "Oh snap! Change a few things up and try submitting again."
    },
    {
      "type": "success",
      "msg": "Well done! You successfully read this important alert message.",
      "closable": true
    }
  ];
  closeAlert(num i) {
    this.alerts.splice(i, 1);
  }

  addAlert() {
    this.alerts.push(msg: "Another alert!", closable: true);
  }
}
