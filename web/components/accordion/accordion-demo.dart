import "package:angular2/angular2.dart";
import 'package:ng2-strap/accordion/accordion.dart';

@Component(selector: "accordion-demo")
@View(
    templateUrl: "./accordion-demo.html",
    directives: const [ACCORDION_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES])
class AccordionDemo {
  bool oneAtATime = true;

  List<String> items = ["Item 1", "Item 2", "Item 3"];

  Map status = {"isFirstOpen": true, "isFirstDisabled": false, 'open': false};

  bool isOpen = false;

  List<dynamic> groups = [
    {"title": "Dynamic Group Header - 1", "content": "Dynamic Group Body - 1"},
    {"title": "Dynamic Group Header - 2", "content": "Dynamic Group Body - 2"}
  ];

  addItem() {
    this.items.add('Item ${this.items.length + 1}');
  }
}
