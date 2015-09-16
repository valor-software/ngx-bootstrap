/// <reference path="../../tsd.d.ts" />
import {
  Directive,
  DefaultValueAccessor, OnInit,
  Self, NgModel, Renderer, ElementRef
} from 'angular2/angular2';


@Directive({
  selector: '[btn-radio][ng-model]',
  properties: ['btnRadio', 'uncheckable'],
  host: {
    '(click)': 'onClick()',
    '[class.active]': 'isActive'
  }
})
export class ButtonRadio extends DefaultValueAccessor implements OnInit {
  private btnRadio:string;
  private uncheckable:boolean;
  cd:NgModel;

  constructor(@Self() cd:NgModel, renderer:Renderer, elementRef:ElementRef) {
    super(cd, renderer, elementRef);
  }

  onInit() {
    this.uncheckable = typeof this.uncheckable !== 'undefined';
  }

  private get isActive() {
    return this.btnRadio === this.value;
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
