import {
  Directive,
  Self, NgModel, ElementRef,
  ControlValueAccessor, OnInit
} from 'angular2/angular2';


@Directive({
  selector: '[btn-radio][ng-model]',
  properties: ['btnRadio', 'uncheckable'],
  host: {
    '(click)': 'onClick()',
    '[class.active]': 'isActive'
  }
})
export class ButtonRadio implements ControlValueAccessor, OnInit {
  public btnRadio:string;
  public uncheckable:boolean;

  constructor(@Self() public cd:NgModel, public el:ElementRef) {
    // hack!
    cd.valueAccessor = this;
  }

  onInit() {
    this.uncheckable = typeof this.uncheckable !== 'undefined';
  }

  private get isActive() {
    return this.btnRadio === this.value;
  }

  // hack view model!
  public get value() {
    return this.cd.viewModel;
  }

  public set value(value) {
    this.cd.viewModel = value;
    // hack: host classes updated before value is set >.<
    if (this.isActive) {
      this.el.nativeElement.classList.add('active');
    } else {
      this.el.nativeElement.classList.remove('active');
    }
  }

  // view -> model
  onClick() {
    if (this.uncheckable && this.btnRadio === this.value) {
      return this.cd.viewToModelUpdate(null);
    }

    this.cd.viewToModelUpdate(this.btnRadio);
  }

  // ControlValueAccessor
  // model -> view
  writeValue(value:any) {
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
