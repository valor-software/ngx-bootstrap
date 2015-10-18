import {
  Directive,
  Self, NgModel, Renderer, ElementRef,
  OnInit, ControlValueAccessor
} from 'angular2/angular2';


@Directive({
  selector: '[btn-checkbox][ng-model]',
  properties: ['btnCheckboxTrue', 'btnCheckboxFalse'],
  host: {
    '(click)': 'onClick()',
    '[class.active]': 'state'
  }
})
export class ButtonCheckbox implements ControlValueAccessor, OnInit {
  private btnCheckboxTrue:any;
  private btnCheckboxFalse:any;

  private value:any;
  private state:boolean = false;

  constructor(@Self() public cd:NgModel) {
    // hack !
    cd.valueAccessor = this;
  }

  onInit() {
    this.toggle(this.trueValue === this.value);
  }

  private get trueValue() {
    return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
  }

  private get falseValue() {
    return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
  }

  toggle(state:boolean) {
    this.state = state;
    this.value = this.state ? this.trueValue : this.falseValue;
  }

  // view -> model
  onClick() {
    this.toggle(!this.state);
    this.cd.viewToModelUpdate(this.value);
  }

  // ControlValueAccessor
  // model -> view
  writeValue(value:any) {
    this.state = this.trueValue === value;
    this.value = value;
  }

  onChange = (_:any) => {};
  onTouched = () => {};

  registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }
}
