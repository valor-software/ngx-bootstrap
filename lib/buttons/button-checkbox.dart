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
    this.toggle(identical(this.trueValue, this.value));
  }

  get trueValue {
    return btnCheckboxTrue ?? true;
  }

  get falseValue {
    return btnCheckboxFalse ?? false;
  }

  toggle(bool state) {
    this.state = state;
    this.value = this.state ? this.trueValue : this.falseValue;
  }

  // model -> view
  writeValue(dynamic value) {
    this.state = identical(this.trueValue, value);
    this.value = value;
  }

  // view -> model
  onClick() {
    this.toggle(!this.state);
    this.cd.viewToModelUpdate(this.value);
  }
}