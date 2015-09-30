/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart";

@Directive (selector: "[btn-radio][ng-model]",
    properties: const [ "btnRadio", "uncheckable"],
    host: const { "(click)" : "onClick()", "[class.active]" : "isActive"})
class ButtonRadio extends DefaultValueAccessor implements OnInit {
  String btnRadio;

  bool uncheckable;

  NgModel cd;

  ButtonRadio(@Self() NgModel cd, Renderer renderer, ElementRef elementRef)
      : super (cd, renderer, elementRef);

  onInit() {
    uncheckable = uncheckable != null;
  }

  get isActive => btnRadio == value;

  // hack view model!
  get value => cd.viewModel;

  set value(value) => cd.viewModel = value;

  // model -> view
  writeValue(dynamic value) => this.value = value;

  // view -> model
  onClick() {
    if (uncheckable && btnRadio == value) {
      return cd.viewToModelUpdate(null);
    }
    cd.viewToModelUpdate(btnRadio);
  }
}