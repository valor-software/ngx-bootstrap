import "package:angular2/angular2.dart";

@Directive (selector: "[btn-radio][ng-model]",
    inputs: const [ "btnRadio", "uncheckable", 'value: ngModel'],
    outputs: const ['valueEmitter: ngModel'],
    host: const { "(click)" : "onClick()", "[class.active]" : "isActive"})
class ButtonRadio extends DefaultValueAccessor {
  String btnRadio;

  bool uncheckable;

  ButtonRadio(Renderer renderer, ElementRef elementRef)
      : super (renderer, elementRef);

  get isActive => btnRadio == value;

  var _value;

  get value => _value;
  set value(value) {
    valueEmitter.add(value);
    _value = value;
  }

  EventEmitter valueEmitter = new EventEmitter();

  onClick() {
    if (uncheckable != false && btnRadio == value) {
      value = null;
      return;
    }
    value = btnRadio;
  }
}