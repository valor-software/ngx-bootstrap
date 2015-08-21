/// <reference path="../../tsd.d.ts" />
import {
  Directive,
  DefaultValueAccessor,
  Self, NgModel, Renderer, ElementRef,
  LifecycleEvent
} from 'angular2/angular2';


@Directive({
  selector: '[ng-model][btn-checkbox]',
  properties: [
    'btnCheckboxTrue: btn-checkbox-true',
    'btnCheckboxFalse: btn-checkbox-false'
  ],
  host: {
    '(click)': 'onClick()',
    '[class.ng-untouched]': 'ngClassUntouched',
    '[class.ng-touched]': 'ngClassTouched',
    '[class.ng-pristine]': 'ngClassPristine',
    '[class.ng-dirty]': 'ngClassDirty',
    '[class.ng-valid]': 'ngClassValid',
    '[class.ng-invalid]': 'ngClassInvalid',
    '[class.active]': 'state'
  },
  lifecycle: [LifecycleEvent.onInit]
})
export class ButtonCheckbox extends DefaultValueAccessor {
  private btnCheckboxTrue:any;
  private btnCheckboxFalse:any;
  private value:any;
  private state:boolean = false;

  constructor(@Self() cd:NgModel, renderer:Renderer, elementRef:ElementRef) {
    super(cd, renderer, elementRef);
  }

  private get trueValue(){
    return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
  }

  private get falseValue(){
    return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
  }

  onInit() {
    this.toggle(this.trueValue === this.value);
  }

  toggle(state:boolean) {
    this.state = state;
    this.value = this.state ? this.trueValue : this.falseValue;
  }

  // model -> view
  writeValue(value:any) {
    this.value = value;
  }

  // view -> model
  onClick() {
    this.toggle(!this.state);
    this.cd.viewToModelUpdate(this.value);
  }
}
