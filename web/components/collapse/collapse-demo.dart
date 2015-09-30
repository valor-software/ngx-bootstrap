/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart" show Component, View;
import "../../../lib/index.dart" show Collapse;

// webpack html imports
var template = require("./collapse-demo.html");

@Component(selector: "collapse-demo")
@View(template: template, directives: const [Collapse])
class CollapseDemo {
  bool isCollapsed = false;
}
