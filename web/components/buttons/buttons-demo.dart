import "package:angular2/angular2.dart";
import "package:ng2_strap/buttons/button-checkbox.dart";
import 'package:ng2_strap/buttons/button-radio.dart';

@Component(
    selector: "buttons-demo",
    templateUrl: "buttons-demo.html",
    directives: const [
      ButtonCheckbox,
      ButtonRadio,
      CORE_DIRECTIVES,
      FORM_DIRECTIVES
    ])
class ButtonsDemo {
  String singleModel = "1";
  String radioModel = "Middle";
  Map checkModel = {"left": false, "middle": true, "right": false};
}
