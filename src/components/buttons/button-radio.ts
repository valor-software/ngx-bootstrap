/// <reference path="../../../typings/tsd.d.ts" />
import {
  Directive,
  DefaultValueAccessor,
  Self, NgModel, Renderer, ElementRef
} from 'angular2/angular2';


@Directive({
  selector: '[ng-model][btn-radio]',
  properties: [
    'btnRadio: btn-radio'
  ],
  host: {
    '(click)': 'onClick()',
    '[class.ng-untouched]': 'ngClassUntouched',
    '[class.ng-touched]': 'ngClassTouched',
    '[class.ng-pristine]': 'ngClassPristine',
    '[class.ng-dirty]': 'ngClassDirty',
    '[class.ng-valid]': 'ngClassValid',
    '[class.ng-invalid]': 'ngClassInvalid',
    '[class.active]': 'isActive'
  }
})
export class ButtonRadio extends DefaultValueAccessor {
  private btnRadio:any;
  uncheckable:any;

  constructor(@Self() cd:NgModel, renderer:Renderer, elementRef:ElementRef) {
    super(cd, renderer, elementRef);
    this.uncheckable = elementRef.nativeElement.getAttribute('uncheckable') != null;

  }

  private get isActive() {
    return typeof this.btnRadio !== 'undefined' ? (this.btnRadio === this.value) : false;
  }

  // hack view model!
  private get value() {
    return this.cd.viewModel;
  }

  private set value(value) {
    this.cd.viewModel = value;
  }

  // model -> view
  writeValue(value:any) {
    this.value = value;
  }

  // view -> model
  onClick() {
    if (this.uncheckable && this.btnRadio === this.value) {
      return this.cd.viewToModelUpdate(null);
    }

    this.cd.viewToModelUpdate(this.btnRadio);
  }
}
