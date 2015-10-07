/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart";

@Directive (selector: "[btn-checkbox][ng-model]",
    inputs: const [ "btnCheckboxTrue", "btnCheckboxFalse", 'value: ngModel'],
    outputs: const ['update: ngModel'],
    host: const { "(click)" : "onClick()", "[class.active]" : "state"})
class ButtonCheckbox extends DefaultValueAccessor implements OnInit {
  dynamic btnCheckboxTrue;

  dynamic btnCheckboxFalse;

  var _value;

  get value => _value;

  set value(value) {
    print('value: $_value');
    _value = value;
    update.add(value);
  }

  EventEmitter update = new EventEmitter();

  bool state = false;

  ButtonCheckbox(Renderer renderer, ElementRef elementRef)
      : super (renderer, elementRef);

  onInit() {
    toggle(trueValue == value);
  }

  get trueValue => btnCheckboxTrue ?? true;

  get falseValue => btnCheckboxFalse ?? false;

  toggle(bool _state) {
    state = _state;
    value = state ? trueValue : falseValue;
  }

  onClick() {
    toggle(!state);
  }
}