import "package:angular2/angular2.dart";
import 'dart:html';

// todo: implement global configuration via DI

// todo: refactor directive has to many functions! (extract to stateless helper)

// todo: implement `time` validator

// todo: replace increment/decrement blockers with getters, or extract

DateTime addMinutes(DateTime time, minutes) => time.add(new Duration(minutes: minutes));

// TODO: templateUrl
@Component (selector: "timepicker[ng-model]",
    inputs: const [
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
    ],
    template: '''
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
class Timepicker extends DefaultValueAccessor implements OnInit {
  // result value
  DateTime _selected = new DateTime.now();

  // config
  num hourStep = 1;

  num minuteStep = 1;

  dynamic meridian;

  List<String> meridians = [ "AM", "PM"];

  bool readonlyInput = false;

  bool mousewheel = true;

  bool arrowkeys = true;

  bool showSpinners = true;

  DateTime min;

  DateTime max;

  // input values
  String hours;

  String minutes;

  DateTime get selected {
    return _selected;
  }

  set selected(DateTime v) {
    if (v != null) {
      this._selected = v;
      this.updateTemplate();
      this.cd.viewToModelUpdate(this.selected.toIso8601String());
    }
  }

  // validation
  bool invalidHours = false;

  bool invalidMinutes = false;

  bool _showMeridian = true;

  get showMeridian {
    return this._showMeridian;
  }

  set showMeridian(bool value) {
    this._showMeridian = value;
    // || !this.$error.DateTime
    if (true) {
      updateTemplate();
      return;
    }
    // Evaluate from template
    var hours = getHoursFromTemplate();
    var minutes = getMinutesFromTemplate();
    if (hours != null && minutes != null) {
      selected;
      refresh();
    }
  }

  NgModel cd;

  Timepicker(this.cd, Renderer renderer, ElementRef elementRef)
      : super (renderer, elementRef) {
    cd.valueAccessor = this;
  }

  // todo: add formatter value to DateTime object
  onInit() {
    // todo: take in account $locale.DATETIME_FORMATS.AMPMS;
    if (mousewheel) {
      setupMousewheelEvents();
    }
    if (arrowkeys) {
      setupArrowkeyEvents();
    }
    setupInputEvents();
  }

  writeValue(v) {
    selected = DateTime.parse(v ?? '1971-01-01T00:00:00');
  }

  refresh([ String type ]) {
    // this.makeValid();
    updateTemplate();
    cd.viewToModelUpdate(selected.toIso8601String());
  }

  updateTemplate([ dynamic keyboardChange ]) {
    var _hours = selected.hour;
    var _minutes = selected.minute;
    if (showMeridian) {
      // Convert 24 to 12 hour system
      _hours = (identical(_hours, 0) || identical(_hours, 12)) ? 12 : _hours % 12;
    }
    // this.hours = keyboardChange === 'h' ? hours : this.pad(hours);

    // if (keyboardChange !== 'm') {

    //  this.minutes = this.pad(minutes);

    // }
    hours = pad(_hours);
    minutes = pad(_minutes);
    meridian = selected.hour < 12 ? meridians[0] : meridians[1];
  }

  getHoursFromTemplate() {
    var hours = int.parse(this.hours);
    var valid = showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 &&
        hours < 24);
    if (!valid) {
      return null;
    }
    if (showMeridian) {
      if (hours == 12) {
        hours = 0;
      }
      if (identical(meridian, meridians [ 1 ])) {
        hours = hours + 12;
      }
    }
    return hours;
  }

  getMinutesFromTemplate() {
    var minutes = int.parse(this.minutes);
    return (minutes >= 0 && minutes < 60) ? minutes : null;
  }

  pad(value) {
    return (value != null && value.toString().length < 2)
        ? "0" + value.toString()
        : value.toString();
  }

  setupMousewheelEvents() {}

  setupArrowkeyEvents() {}

  setupInputEvents() {}

  updateHours() {
    if (readonlyInput) {
      return;
    }
    var hours = getHoursFromTemplate();
    var minutes = getMinutesFromTemplate();
    if (hours == null || minutes == null) {}
    selected = _updateDateTime(selected, hours: hours);
    if (min != null && !(selected.isBefore(min) || max != null && selected.isAfter(max))) {
      refresh("h");
    }
  }

  hoursOnBlur(Event event) {
    if (readonlyInput) {
      return;
    }
    // todo: binded with validation
    if (!invalidHours && int.parse(hours) < 10) {
      hours = pad(hours);
    }
  }

  updateMinutes() {
    if (readonlyInput) {
      return;
    }
    var minutes = getMinutesFromTemplate();
    var hours = getHoursFromTemplate();
    if (minutes == null || hours == null) {}
    selected = _updateDateTime(selected, minutes: minutes);
//    selected.minute = minutes;
    if (!(min != null && selected.isBefore(min) || max != null && selected.isAfter(max))) {
      refresh("m");
    }
  }

  _updateDateTime(DateTime selected, {int minutes, int hours}) =>
      new DateTime(
          selected.year,
          selected.month,
          selected.day,
          hours ?? selected.hour,
          minutes ?? selected.minute,
          selected.second);

  minutesOnBlur(Event event) {
    if (readonlyInput) {
      return;
    }
    if (!invalidMinutes && int.parse(minutes) < 10) {
      minutes = pad(minutes);
    }
  }

  noIncrementHours() {
    var incrementedSelected = addMinutes(selected, hourStep * 60);
    return min != null && incrementedSelected.isBefore(min)
        || max != null && incrementedSelected.isAfter(selected) && incrementedSelected.isAfter(max);
  }

  noDecrementHours() {
    var decrementedSelected = addMinutes(selected, -hourStep * 60);
    return min != null && decrementedSelected.isBefore(min)
        || max != null && decrementedSelected.isAfter(selected) && decrementedSelected.isAfter(max);
  }

  noIncrementMinutes() {
    var incrementedSelected = addMinutes(selected, minuteStep);
    return min != null && incrementedSelected.isBefore(min)
        || max != null && incrementedSelected.isAfter(selected) && incrementedSelected.isAfter(max);
  }

  noDecrementMinutes() {
    var decrementedSelected = addMinutes(selected, -minuteStep);
    return min != null && decrementedSelected.isBefore(min)
        || max != null && decrementedSelected.isAfter(selected) && decrementedSelected.isAfter(max);
  }

  addMinutesToSelected(minutes) {
    selected = addMinutes(selected, minutes);
    refresh();
  }

  noToggleMeridian() {
    if (selected.hour < 13) {
      return max != null && addMinutes(selected, 12 * 60).isAfter(max);
    } else {
      return min != null && addMinutes(selected, -12 * 60).isBefore(min);
    }
  }

  incrementHours() {
    if (!noIncrementHours()) {
      addMinutesToSelected(hourStep * 60);
    }
  }

  decrementHours() {
    if (!noDecrementHours()) {
      addMinutesToSelected(-hourStep * 60);
    }
  }

  incrementMinutes() {
    if (!noIncrementMinutes()) {
      addMinutesToSelected(minuteStep);
    }
  }

  decrementMinutes() {
    if (!noDecrementMinutes()) {
      addMinutesToSelected(-minuteStep);
    }
  }

  toggleMeridian() {
    if (!noToggleMeridian()) {
      var sign = selected.hour < 12 ? 1 : -1;
      addMinutesToSelected(12 * 60 * sign);
    }
  }
}