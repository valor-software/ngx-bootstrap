/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, OnInit, EventEmitter, NgClass, DefaultValueAccessor, NgFor, NgModel, Self, Renderer, ElementRef;

// TODO: templateUrl
@Component (selector: "rating[ng-model]",
    properties: const [
      "max", "readonly", "titles", "stateOn", "stateOff", "ratingStates"],
    events: const [ "onHover", "onLeave"],
    host: const { "(keydown)" : "onKeydown(\$event)"})
@View (template: '''
    <span (mouseleave)="reset()" (keydown)="onKeydown(\$event)" tabindex="0" role="slider" aria-valuemin="0" [attr.aria-valuemax]="range.length" [attr.aria-valuenow]="value">
      <template ng-for #r [ng-for-of]="range" #index="index">
        <span class="sr-only">({{ index < value ? \'*\' : \' \' }})</span>
        <i (mouseenter)="enter(index + 1)" (click)="rate(index + 1)" class="glyphicon" [ng-class]="index < value ? r.stateOn : r.stateOff" [title]="r.title" ></i>
      </template>
    </span>
  ''', directives: const [ NgClass, NgFor])
class Rating extends DefaultValueAccessor
    implements OnInit {
  num max;

  List<dynamic> range;

  num value;

  num preValue;

  List<String> titles;

  String stateOn;

  String stateOff;

  bool readonly;

  List<dynamic> ratingStates;

  EventEmitter onHover = new EventEmitter ();

  EventEmitter onLeave = new EventEmitter ();

  Rating(@Self () NgModel cd, Renderer renderer, ElementRef elementRef)
      : super (cd, renderer, elementRef) {
    /* super call moved to initializer */
    ;
  }

  onInit() {
    this.max = !identical(, "undefined") ? this.max : 5;
    this.readonly = identical(this.readonly, true);
    this.stateOn = !identical(, "undefined") ? this.stateOn : "glyphicon-star";
    this.stateOff =
    !identical(, "undefined") ? this.stateOff : "glyphicon-star-empty";
    this.titles =
    !identical(, "undefined") && this.titles.length > 0 ? this.titles : [
      "one", "two", "three", "four", "five"];
    this.range = this.buildTemplateObjects(this.ratingStates, this.max);
  }

  // model -> view
  writeValue(num value) {
    if (!identical(value % 1, value)) {
      this.value = Math.round(value);
      this.preValue = value;
      return;
    }
    this.preValue = value;
    this.value = value;
  }

  buildTemplateObjects(List<dynamic> ratingStates, num max) {
    ratingStates = ratingStates || [];
    var count = ratingStates.length || max;
    var result = [];
    for (var i = 0; i < count; i ++) {
      result.push(Object.assign({
        "index" : i,
        "stateOn" : this.stateOn,
        "stateOff" : this.stateOff,
        "title" : this.titles [ i ] || i + 1
      }, ratingStates [ i ] || {}));
    }
    return result;
  }

  rate(num value) {
    if (!this.readonly && value >= 0 && value <= this.range.length) {
      this.writeValue(value);
      this.cd.viewToModelUpdate(value);
    }
  }

  enter(num value) {
    if (!this.readonly) {
      this.value = value;
      this.onHover.next(value);
    }
  }

  reset() {
    this.value = this.preValue;
    this.onLeave.next(this.value);
  }

  onKeydown(KeyboardEvent event) {
    if (identical([ 37, 38, 39, 40].indexOf(event.which), -1)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    var sign = identical(event.which, 38) || identical(event.which, 39)
        ? 1
        : -1;
    this.rate(this.value + sign);
  }
}