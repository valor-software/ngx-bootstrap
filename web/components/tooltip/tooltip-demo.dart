/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES;
import "../../../lib/index.dart" show tooltip;

// webpack html imports
var template = require("./tooltip-demo.html");

@Component(selector: "tooltip-demo")
@View(
    template: template,
    directives: const [tooltip, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass],
    styles: const [
      '''
    /* Specify styling for tooltip contents */
    .tooltip.customClass .tooltip-inner {
        color: #880000;
        background-color: #ffff66;
        box-shadow: 0 6px 12px rgba(0,0,0,.175);
    }
    /* Hide arrow */
    .tooltip.customClass .tooltip-arrow {
        display: none;
    }
  '''
    ])
class TooltipDemo {
  String dynamicTooltip = "Hello, World!";
  String dynamicTooltipText = "dynamic";
  String htmlTooltip = "I've been made <b>bold</b>!";
}
