import "package:angular2/angular2.dart";

@Directive(
    selector: "n2s-btn-checkbox",
    inputs: const ["trueValue", "falseValue"],
    host: const { "(click)" : "onClick()", "[class.active]" : "state"}
)
class ButtonCheckbox extends DefaultValueAccessor implements OnInit {
  ButtonCheckbox(this.ngModel, Renderer renderer, ElementRef elementRef) : super(renderer, elementRef) {
    ngModel.valueAccessor = this;
  }

  NgModel ngModel;

  dynamic trueValue = true;

  dynamic falseValue = false;

  var _value;

  bool state = false;


  @override
  ngOnInit() {
    state = trueValue == _value;
  }

  writeValue(value) {
    _value = value;
    state = trueValue == _value;
    super.writeValue(_value);
  }

  toggle(bool _state) {
    state = _state;
    _value = state ? trueValue : falseValue;
    ngModel.viewToModelUpdate(_value);
  }

  onClick() {
    toggle(!state);
  }
}