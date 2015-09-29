/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Directive, DefaultValueAccessor, OnInit, Self, NgModel, Renderer, ElementRef;

@Directive (selector: "[btn-radio][ng-model]",
    properties: const [ "btnRadio", "uncheckable"],
    host: const { "(click)" : "onClick()", "[class.active]" : "isActive"})
class ButtonRadio extends DefaultValueAccessor implements OnInit {
  String btnRadio;

  bool uncheckable;

  NgModel cd;

  ButtonRadio(@Self () NgModel cd, Renderer renderer, ElementRef elementRef)
      : super (cd, renderer, elementRef) {
    /* super call moved to initializer */
    ;
  }

  onInit() {
    this.uncheckable = uncheckable != null;
  }

  get isActive {
    return identical(this.btnRadio, this.value);
  }

  // hack view model!
  get value {
    return this.cd.viewModel;
  }

  set value(value) {
    this.cd.viewModel = value;
  }

  // model -> view
  writeValue(dynamic value) {
    this.value = value;
  }

  // view -> model
  onClick() {
    if (this.uncheckable && identical(this.btnRadio, this.value)) {
      return this.cd.viewToModelUpdate(null);
    }
    this.cd.viewToModelUpdate(this.btnRadio);
  }
}