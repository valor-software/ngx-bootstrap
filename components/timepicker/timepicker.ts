import {
  Component, View,
  OnInit, EventEmitter,
  ControlValueAccessor,
  ElementRef, ViewContainerRef,
  NgIf, NgClass, FORM_DIRECTIVES,
  Self, NgModel, Renderer
} from 'angular2/angular2';

export interface ITimepickerConfig {
  hourStep: number;
  minuteStep: number;
  showMeridian: boolean;
  meridians?: any[];
  readonlyInput: boolean;
  mousewheel: boolean;
  arrowkeys: boolean;
  showSpinners: boolean;
  min?: number;
  max?: number;
}

// todo: implement global configuration via DI
// todo: refactor directive has to many functions! (extract to stateless helper)
// todo: use moment js?
// todo: implement `time` validator
// todo: replace increment/decrement blockers with getters, or extract
// todo: unify work with selected
export const timepickerConfig:ITimepickerConfig = {
  hourStep: 1,
  minuteStep: 1,
  showMeridian: true,
  meridians: null,
  readonlyInput: false,
  mousewheel: true,
  arrowkeys: true,
  showSpinners: true,
  min: void 0,
  max: void 0
};

function isDefined(value:any):boolean {
  return typeof value !== 'undefined';
}

function def(value:any, fn:Function, defaultValue:any) {
  return fn(value) ? value : defaultValue;
}

function addMinutes(date: any, minutes:number) {
  let dt = new Date(date.getTime() + minutes * 60000);
  let newDate = new Date(date);
  newDate.setHours(dt.getHours(), dt.getMinutes());
  return newDate;
}

// TODO: templateUrl
@Component({
  selector: 'timepicker[ng-model]',
  properties: [
    'hourStep', 'minuteStep',
    'meridians', 'showMeridian',
    'readonlyInput',
    'mousewheel', 'arrowkeys',
    'showSpinners',
    'min', 'max'
  ]
})
@View({
  template: `
    <table>
      <tbody>
        <tr class="text-center" [ng-class]="{hidden: !showSpinners}">
          <td><a (click)="incrementHours()" [ng-class]="{disabled: noIncrementHours()}" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>
          <td>&nbsp;</td>
          <td><a (click)="incrementMinutes()" [ng-class]="{disabled: noIncrementMinutes()}" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>
          <td [ng-class]="{hidden: !showMeridian}" [hidden]="!showMeridian"></td>
        </tr>
        <tr>
          <td class="form-group" [ng-class]="{'has-error': invalidHours}">
            <input style="width:50px;" type="text" [(ng-model)]="hours" (change)="updateHours()" class="form-control text-center" [readonly]="readonlyInput" (blur)="hoursOnBlur($event)" maxlength="2">
          </td>
          <td>:</td>
          <td class="form-group" [ng-class]="{'has-error': invalidMinutes}">
            <input style="width:50px;" type="text" [(ng-model)]="minutes" (change)="updateMinutes()" class="form-control text-center" [readonly]="readonlyInput" (blur)="minutesOnBlur($event)" maxlength="2">
          </td>
          <td [ng-class]="{hidden: !showMeridian}" [hidden]="!showMeridian"><button type="button" [ng-class]="{disabled: noToggleMeridian()}" class="btn btn-default text-center" (click)="toggleMeridian()">{{meridian}}</button></td>
        </tr>
        <tr class="text-center" [ng-class]="{hidden: !showSpinners}">
          <td><a (click)="decrementHours()" [ng-class]="{disabled: noDecrementHours()}" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>
          <td>&nbsp;</td>
          <td><a (click)="decrementMinutes()" [ng-class]="{disabled: noDecrementMinutes()}" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>
          <td [ng-class]="{hidden: !showMeridian}" [hidden]="!showMeridian"></td>
        </tr>
      </tbody>
    </table>
  `,
  directives: [FORM_DIRECTIVES, NgClass]
})
export class Timepicker implements ControlValueAccessor, OnInit {
  // result value
  private _selected:Date = new Date();
  // config
  private hourStep:number;
  private minuteStep:number;
  private _showMeridian:boolean;
  private meridian:any; // ??
  private meridians:Array<string> = ['AM', 'PM']; // ??
  private readonlyInput:boolean;
  private mousewheel:boolean;
  private arrowkeys:boolean;
  private showSpinners:boolean;
  private min:Date;
  private max:Date;

  // input values
  private hours:string;
  private minutes:string;

  private get selected():Date {
    return this._selected;
  }

  private set selected(v:Date) {
    if (v) {
      this._selected = v;
      this.updateTemplate();
      this.cd.viewToModelUpdate(this.selected);
    }
  }

  // validation
  private invalidHours:any;
  private invalidMinutes:any;

  private get showMeridian() {
    return this._showMeridian;
  }

  private set showMeridian(value:boolean) {
    this._showMeridian = value;
    // || !this.$error.time
    if (true) {
      this.updateTemplate();
      return;
    }
    // Evaluate from template
    let hours = this.getHoursFromTemplate();
    let minutes = this.getMinutesFromTemplate();
    if (isDefined(hours) && isDefined(minutes)) {
      this.selected.setHours(hours);
      this.refresh();
    }
  }

  constructor(@Self() public cd:NgModel) {
    cd.valueAccessor = this;
  }

  // todo: add formatter value to Date object
  onInit() {
    // todo: take in account $locale.DATETIME_FORMATS.AMPMS;
    this.meridians = def(this.meridians, isDefined, timepickerConfig.meridians) || ['AM', 'PM'];
    this.mousewheel = def(this.mousewheel, isDefined, timepickerConfig.mousewheel);
    if (this.mousewheel) {
      this.setupMousewheelEvents();
    }
    this.arrowkeys = def(this.arrowkeys, isDefined, timepickerConfig.arrowkeys);
    if (this.arrowkeys) {
      this.setupArrowkeyEvents();
    }

    this.readonlyInput = def(this.readonlyInput, isDefined, timepickerConfig.readonlyInput);

    this.setupInputEvents();

    this.hourStep = def(this.hourStep, isDefined, timepickerConfig.hourStep);
    this.minuteStep = def(this.minuteStep, isDefined, timepickerConfig.minuteStep);
    this.min = def(this.min, isDefined, timepickerConfig.min);
    this.max = def(this.max, isDefined, timepickerConfig.max);
    // 12H / 24H mode
    this.showMeridian = def(this.showMeridian, isDefined, timepickerConfig.showMeridian);
    this.showSpinners = def(this.showSpinners, isDefined, timepickerConfig.showSpinners);
  }

  writeValue(v:any) {
    if (v === this.selected) {
      return;
    }
    if (v && v instanceof Date) {
      this.selected = v;
      return;
    }
    this.selected = v ? new Date(v) : null;
    // todo: implement logic from render
  }

  private refresh(type?:string) {
    // this.makeValid();
    this.updateTemplate();
    this.cd.viewToModelUpdate(this.selected);
  }

  private updateTemplate(keyboardChange?:any) {
    let hours = this.selected.getHours();
    let minutes = this.selected.getMinutes();

    if (this.showMeridian) {
      // Convert 24 to 12 hour system
      hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
    }

    // this.hours = keyboardChange === 'h' ? hours : this.pad(hours);
    // if (keyboardChange !== 'm') {
    //  this.minutes = this.pad(minutes);
    // }
    this.hours = this.pad(hours);
    this.minutes = this.pad(minutes);
    this.meridian = this.selected.getHours() < 12 ? this.meridians[0] : this.meridians[1];
  }

  private getHoursFromTemplate() {
    let hours = parseInt(this.hours, 10);
    let valid = this.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
    if (!valid) {
      return undefined;
    }

    if (this.showMeridian) {
      if (hours === 12) {
        hours = 0;
      }
      if (this.meridian === this.meridians[1]) {
        hours = hours + 12;
      }
    }
    return hours;
  }

  private getMinutesFromTemplate() {
    let minutes = parseInt(this.minutes, 10);
    return (minutes >= 0 && minutes < 60) ? minutes : undefined;
  }

  private pad(value:any) {
    return (isDefined(value) && value.toString().length < 2) ? '0' + value : value.toString();
  }


  private setupMousewheelEvents() {
  }

  private setupArrowkeyEvents() {
  }

  private setupInputEvents() {

  }

  private updateHours() {
    if (this.readonlyInput) {
      return;
    }

    let hours = this.getHoursFromTemplate();
    let minutes = this.getMinutesFromTemplate();

    if (!isDefined(hours) || !isDefined(minutes)) {
      // todo: validation?
      // invalidate(true);
    }

    this.selected.setHours(hours);
    if (this.selected < this.min || this.selected > this.max) {
      // todo: validation?
      // invalidate(true);
    } else {
      this.refresh('h');
    }
  }

  private hoursOnBlur(event:Event) {
    if (this.readonlyInput) {
      return;
    }

    // todo: binded with validation
    if (!this.invalidHours && parseInt(this.hours, 10) < 10) {
      this.hours = this.pad(this.hours);
    }
  }

  private updateMinutes() {
    if (this.readonlyInput) {
      return;
    }

    let minutes = this.getMinutesFromTemplate();
    let hours = this.getHoursFromTemplate();

    if (!isDefined(minutes) || !isDefined(hours)) {
      // todo: validation
      // invalidate(undefined, true);
    }

    this.selected.setMinutes(minutes);
    if (this.selected < this.min || this.selected > this.max) {
      // todo: validation
      // invalidate(undefined, true);
    } else {
      this.refresh('m');
    }
  }

  private minutesOnBlur(event:Event) {
    if (this.readonlyInput) {
      return;
    }

    if (!this.invalidMinutes && parseInt(this.minutes, 10) < 10) {
      this.minutes = this.pad(this.minutes);
    }
  }

  private noIncrementHours() {
    let incrementedSelected = addMinutes(this.selected, this.hourStep * 60);
    return incrementedSelected > this.max ||
      (incrementedSelected < this.selected && incrementedSelected < this.min);
  }

  private noDecrementHours() {
    let decrementedSelected = addMinutes(this.selected, -this.hourStep * 60);
    return decrementedSelected < this.min ||
      (decrementedSelected > this.selected && decrementedSelected > this.max);
  }

  private noIncrementMinutes() {
    let incrementedSelected = addMinutes(this.selected, this.minuteStep);
    return incrementedSelected > this.max ||
      (incrementedSelected < this.selected && incrementedSelected < this.min);
  }

  private noDecrementMinutes() {
    let decrementedSelected = addMinutes(this.selected, -this.minuteStep);
    return decrementedSelected < this.min ||
      (decrementedSelected > this.selected && decrementedSelected > this.max);

  }

  private addMinutesToSelected(minutes:any) {
    this.selected = addMinutes(this.selected, minutes);
    this.refresh();
  }

  noToggleMeridian() {
    if (this.selected.getHours() < 13) {
      return addMinutes(this.selected, 12 * 60) > this.max;
    } else {
      return addMinutes(this.selected, -12 * 60) < this.min;
    }
  }

  private incrementHours() {
    if (!this.noIncrementHours()) {
      this.addMinutesToSelected(this.hourStep * 60);
    }
  }

  private decrementHours() {
    if (!this.noDecrementHours()) {
      this.addMinutesToSelected(-this.hourStep * 60);
    }
  }

  private incrementMinutes() {
    if (!this.noIncrementMinutes()) {
      this.addMinutesToSelected(this.minuteStep);
    }
  }

  private decrementMinutes() {
    if (!this.noDecrementMinutes()) {
      this.addMinutesToSelected(-this.minuteStep);
    }
  }

  private toggleMeridian() {
    if (!this.noToggleMeridian()) {
      let sign = this.selected.getHours() < 12 ? 1 : -1;
      this.addMinutesToSelected(12 * 60 * sign);
    }
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
