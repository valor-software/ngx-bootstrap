/// <reference path="../../tsd.d.ts" />
import {
  Directive,
  DefaultValueAccessor,
  Self, NgModel, Renderer, ElementRef,
  OnInit
} from 'angular2/angular2';


@Directive({
  selector: '[btn-checkbox][ng-model]',
  properties: ['btnCheckboxTrue', 'btnCheckboxFalse'],
  host: {
    '(click)': 'onClick()',
    '[class.active]': 'state'
  }
})
export class ButtonCheckbox extends DefaultValueAccessor implements OnInit {
  private btnCheckboxTrue:any;
  private btnCheckboxFalse:any;
  private value:any;
  private state:boolean = false;

  constructor(@Self() cd:NgModel, renderer:Renderer, elementRef:ElementRef) {
    super(cd, renderer, elementRef);
  }

  ngOnInit() {
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

  // model -> view
  writeValue(value:any) {
    this.state = this.trueValue === value;
    this.value = value;
  }

  // view -> model
  onClick() {
    this.toggle(!this.state);
    this.cd.viewToModelUpdate(this.value);
  }
}
