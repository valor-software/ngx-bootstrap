/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, OnInit, EventEmitter, DefaultValueAccessor, ElementRef, ViewContainerRef, NgIf, NgClass, FORM_DIRECTIVES, Self, NgModel, Renderer;
// todo: implement global configuration via DI

// todo: refactor directive has to many functions! (extract to stateless helper)

// todo: use moment js?

// todo: implement `time` validator

// todo: replace increment/decrement blockers with getters, or extract

// todo: unify work with selected
const timepickerConfig = {
  "hourStep" : 1,
  "minuteStep" : 1,
  "showMeridian" : true,
  "meridians" : null,
  "readonlyInput" : false,
  "mousewheel" : true,
  "arrowkeys" : true,
  "showSpinners" : true,
  "min" : undefined,
  "max" : undefined
};

bool isDefined(dynamic value) {
  return !identical(, "undefined");
}

def(dynamic value, Function fn, defaultValue) {
  return fn(value) ? value : defaultValue;
}

addMinutes(date, minutes) {
  var dt = new DateTime (date.getTime() + minutes * 60000);
  var newDate = new DateTime (date);
  newDate.setHours(dt.getHours(), dt.getMinutes());
  return newDate;
}
// TODO: templateUrl
@Component (selector: "timepicker[ng-model]",
    properties: const [
      "hourStep",
      "minuteStep",
      "meridians",
      "showMeridian",
      "readonlyInput",
      "mousewheel",
      "arrowkeys",
      "showSpinners",
      "min",
      "max"
    ])
@View (template: '''
    <table>
      <tbody>
        <tr class="text-center" [ng-class]="{hidden: !showSpinners}">
          <td><a (click)="incrementHours()" [ng-class]="{disabled: noIncrementHours()}" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>
          <td>&nbsp;</td>
          <td><a (click)="incrementMinutes()" [ng-class]="{disabled: noIncrementMinutes()}" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>
          <td [ng-class]="{hidden: !showMeridian}" [hidden]="!showMeridian"></td>
        </tr>
        <tr>
          <td class="form-group" [ng-class]="{\'has-error\': invalidHours}">
            <input style="width:50px;" type="text" [(ng-model)]="hours" (change)="updateHours()" class="form-control text-center" [readonly]="readonlyInput" (blur)="hoursOnBlur(\$event)" maxlength="2">
          </td>
          <td>:</td>
          <td class="form-group" [ng-class]="{\'has-error\': invalidMinutes}">
            <input style="width:50px;" type="text" [(ng-model)]="minutes" (change)="updateMinutes()" class="form-control text-center" [readonly]="readonlyInput" (blur)="minutesOnBlur(\$event)" maxlength="2">
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
  ''', directives: const [ FORM_DIRECTIVES, NgClass])
class Timepicker extends DefaultValueAccessor
    implements OnInit {
  // result value
  DateTime _selected = new DateTime ();

  // config
  num hourStep;

  num minuteStep;

  bool _showMeridian;

  dynamic meridian;

  List<String> meridians = [ "AM", "PM"];

  bool readonlyInput;

  bool mousewheel;

  bool arrowkeys;

  bool showSpinners;

  DateTime min;

  DateTime max;

  // input values
  String hours;

  String minutes;

  get selected {
    return this._selected;
  }

  set selected(DateTime v) {
    if (v) {
      this._selected = v;
      this.updateTemplate();
      this.cd.viewToModelUpdate(this.selected);
    }
  }

  // validation
  dynamic invalidHours;

  dynamic invalidMinutes;

  get showMeridian {
    return this._showMeridian;
  }

  set showMeridian(bool value) {
    this._showMeridian = value;
    // || !this.$error.time
    if (true) {
      this.updateTemplate();
      return;
    }
    // Evaluate from template
    var hours = this.getHoursFromTemplate();
    var minutes = this.getMinutesFromTemplate();
    if (isDefined(hours) && isDefined(minutes)) {
      this.selected.setHours(hours);
      this.refresh();
    }
  }

  Timepicker(@Self () NgModel cd, Renderer renderer, ElementRef elementRef)
      : super (cd, renderer, elementRef) {
    /* super call moved to initializer */
    ;
  }

  // todo: add formatter value to DateTime object
  onInit() {
    // todo: take in account $locale.DATETIME_FORMATS.AMPMS;
    this.meridians =
        def(this.meridians, isDefined, timepickerConfig.meridians) ||
            [ "AM", "PM"];
    this.mousewheel =
        def(this.mousewheel, isDefined, timepickerConfig.mousewheel);
    if (this.mousewheel) {
      this.setupMousewheelEvents();
    }
    this.arrowkeys = def(this.arrowkeys, isDefined, timepickerConfig.arrowkeys);
    if (this.arrowkeys) {
      this.setupArrowkeyEvents();
    }
    this.readonlyInput =
        def(this.readonlyInput, isDefined, timepickerConfig.readonlyInput);
    this.setupInputEvents();
    this.hourStep = def(this.hourStep, isDefined, timepickerConfig.hourStep);
    this.minuteStep =
        def(this.minuteStep, isDefined, timepickerConfig.minuteStep);
    this.min = def(this.min, isDefined, timepickerConfig.min);
    this.max = def(this.max, isDefined, timepickerConfig.max);
    // 12H / 24H mode
    this.showMeridian =
        def(this.showMeridian, isDefined, timepickerConfig.showMeridian);
    this.showSpinners =
        def(this.showSpinners, isDefined, timepickerConfig.showSpinners);
  }

  writeValue(v) {
    this.selected = v ? new DateTime (v) : null;
  }

  refresh([ String type ]) {
    // this.makeValid();
    this.updateTemplate();
    this.cd.viewToModelUpdate(this.selected);
  }

  updateTemplate([ dynamic keyboardChange ]) {
    var hours = this.selected.getHours();
    var minutes = this.selected.getMinutes();
    if (this.showMeridian) {
      // Convert 24 to 12 hour system
      hours = (identical(hours, 0) || identical(hours, 12)) ? 12 : hours % 12;
    }
    // this.hours = keyboardChange === 'h' ? hours : this.pad(hours);

    // if (keyboardChange !== 'm') {

    //  this.minutes = this.pad(minutes);

    // }
    this.hours = this.pad(hours);
    this.minutes = this.pad(minutes);
    this.meridian =
    this.selected.getHours() < 12 ? this.meridians [ 0 ] : this.meridians [ 1 ];
  }

  getHoursFromTemplate() {
    var hours = parseInt(this.hours, 10);
    var valid = this.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 &&
        hours < 24);
    if (!valid) {
      return undefined;
    }
    if (this.showMeridian) {
      if (identical(hours, 12)) {
        hours = 0;
      }
      if (identical(this.meridian, this.meridians [ 1 ])) {
        hours = hours + 12;
      }
    }
    return hours;
  }

  getMinutesFromTemplate() {
    var minutes = parseInt(this.minutes, 10);
    return (minutes >= 0 && minutes < 60) ? minutes : undefined;
  }

  pad(value) {
    return (isDefined(value) && value
        .toString()
        .length < 2) ? "0" + value : value.toString();
  }

  setupMousewheelEvents() {}

  setupArrowkeyEvents() {}

  setupInputEvents() {}

  updateHours() {
    if (this.readonlyInput) {
      return;
    }
    var hours = this.getHoursFromTemplate();
    var minutes = this.getMinutesFromTemplate();
    if (!isDefined(hours) || !isDefined(minutes)) {}
    this.selected.setHours(hours);
    if (this.selected < this.min || this.selected > this.max) {} else {
      this.refresh("h");
    }
  }

  hoursOnBlur(Event event) {
    if (this.readonlyInput) {
      return;
    }
    // todo: binded with validation
    if (!this.invalidHours && parseInt(this.hours, 10) < 10) {
      this.hours = this.pad(this.hours);
    }
  }

  updateMinutes() {
    if (this.readonlyInput) {
      return;
    }
    var minutes = this.getMinutesFromTemplate();
    var hours = this.getHoursFromTemplate();
    if (!isDefined(minutes) || !isDefined(hours)) {}
    this.selected.setMinutes(minutes);
    if (this.selected < this.min || this.selected > this.max) {} else {
      this.refresh("m");
    }
  }

  minutesOnBlur(Event event) {
    if (this.readonlyInput) {
      return;
    }
    if (!this.invalidMinutes && parseInt(this.minutes, 10) < 10) {
      this.minutes = this.pad(this.minutes);
    }
  }

  noIncrementHours() {
    var incrementedSelected = addMinutes(this.selected, this.hourStep * 60);
    return incrementedSelected > this.max ||
        (incrementedSelected < this.selected && incrementedSelected < this.min);
  }

  noDecrementHours() {
    var decrementedSelected = addMinutes(this.selected, -this.hourStep * 60);
    return decrementedSelected < this.min ||
        (decrementedSelected > this.selected && decrementedSelected > this.max);
  }

  noIncrementMinutes() {
    var incrementedSelected = addMinutes(this.selected, this.minuteStep);
    return incrementedSelected > this.max ||
        (incrementedSelected < this.selected && incrementedSelected < this.min);
  }

  noDecrementMinutes() {
    var decrementedSelected = addMinutes(this.selected, -this.minuteStep);
    return decrementedSelected < this.min ||
        (decrementedSelected > this.selected && decrementedSelected > this.max);
  }

  addMinutesToSelected(minutes) {
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

  incrementHours() {
    if (!this.noIncrementHours()) {
      this.addMinutesToSelected(this.hourStep * 60);
    }
  }

  decrementHours() {
    if (!this.noDecrementHours()) {
      this.addMinutesToSelected(-this.hourStep * 60);
    }
  }

  incrementMinutes() {
    if (!this.noIncrementMinutes()) {
      this.addMinutesToSelected(this.minuteStep);
    }
  }

  decrementMinutes() {
    if (!this.noDecrementMinutes()) {
      this.addMinutesToSelected(-this.minuteStep);
    }
  }

  toggleMeridian() {
    if (!this.noToggleMeridian()) {
      var sign = this.selected.getHours() < 12 ? 1 : -1;
      this.addMinutesToSelected(12 * 60 * sign);
    }
  }
}