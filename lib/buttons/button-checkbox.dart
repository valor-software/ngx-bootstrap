/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Directive, DefaultValueAccessor, Self, NgModel, Renderer, ElementRef, OnInit;

@Directive (selector: "[btn-checkbox][ng-model]",
    properties: const [ "btnCheckboxTrue", "btnCheckboxFalse"],
    host: const { "(click)" : "onClick()", "[class.active]" : "state"})
class ButtonCheckbox extends DefaultValueAccessor implements OnInit {
  dynamic btnCheckboxTrue;

  dynamic btnCheckboxFalse;

  dynamic value;

  bool state = false;

  ButtonCheckbox(@Self() NgModel cd, Renderer renderer, ElementRef elementRef)
      : super (cd, renderer, elementRef);

  onInit() {
    toggle(trueValue == value);
  }

  get trueValue => btnCheckboxTrue ?? true;

  get falseValue => btnCheckboxFalse ?? false;

  toggle(bool state) {
    this.state = state;
    value = this.state ? trueValue : falseValue;
  }

  // model -> view
  writeValue(dynamic value) {
    state = trueValue == value;
    this.value = value;
  }

  // view -> model
  onClick() {
    toggle(!state);
    cd.viewToModelUpdate(value);
  }
}