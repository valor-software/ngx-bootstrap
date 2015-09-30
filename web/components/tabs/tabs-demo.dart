/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart" show Component, View, CORE_DIRECTIVES;
import "../../../lib/index.dart" show tabs;

// webpack html imports
var template = require("./tabs-demo.html");

@Component(selector: "tabs-demo")
@View(template: template, directives: const [tabs, CORE_DIRECTIVES])
class TabsDemo {
  Array<dynamic> tabs = [
    {"title": "Dynamic Title 1", "content": "Dynamic content 1"},
    {
      "title": "Dynamic Title 2",
      "content": "Dynamic content 2",
      "disabled": true
    }
  ];
  alertMe() {
    setTimeout(() {
      alert("You've selected the alert tab!");
    });
  }
}
