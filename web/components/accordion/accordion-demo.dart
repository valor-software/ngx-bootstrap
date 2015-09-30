/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass;
import "../../../lib/index.dart" show accordion;

@Component(selector: "accordion-demo")
@View(
    templateUrl: "./accordion-demo.html",
    directives: const [accordion, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES])
class AccordionDemo {
  bool oneAtATime = true;
  List<String> items = ["Item 1", "Item 2", "Item 3"];
  Object status = {"isFirstOpen": true, "isFirstDisabled": false};
  List<dynamic> groups = [
    {"title": "Dynamic Group Header - 1", "content": "Dynamic Group Body - 1"},
    {"title": "Dynamic Group Header - 2", "content": "Dynamic Group Body - 2"}
  ];
  addItem() {
    this.items.push('''Items ${ this . items . length + 1}''');
  }
}
