import "package:angular2/angular2.dart";
import 'dart:html';
import 'package:node_shims/js.dart';

// TODO: templateUrl
@Component (selector: "rating[ng-model]",
    inputs: const [
      "max", "readonly", "titles", "stateOn", "stateOff", "ratingStates"],
    outputs: const [ "onHover", "onLeave"],
    host: const { "(keydown)" : "onKeydown(\$event)"},
    template: '''
    <span (mouseleave)="reset()" (keydown)="onKeydown(\$event)" tabindex="0" role="slider" aria-valuemin="0" [attr.aria-valuemax]="range.length" [attr.aria-valuenow]="value">
      <template ng-for #r [ng-for-of]="range" #index="index">
        <span class="sr-only">({{ index < value ? '*' : ' ' }})</span>
        <i (mouseenter)="enter(index + 1)" (click)="rate(index + 1)" class="glyphicon" [ng-class]="index < value ? r['stateOn'] : r['stateOff']" [title]="r['title']" ></i>
      </template>
    </span>
  ''', directives: const [NgClass, NgFor])
class Rating extends DefaultValueAccessor implements OnInit {
  Rating(this.cd, Renderer renderer, ElementRef elementRef)
      : super (renderer, elementRef) {
    cd.valueAccessor = this;
  }

  NgModel cd;

  num max;

  List range;

  num value;

  num preValue;

  List<String> titles;

  String stateOn;

  String stateOff;

  bool readonly;

  List ratingStates;

  EventEmitter onHover = new EventEmitter ();

  EventEmitter onLeave = new EventEmitter ();

  onInit() {
    max ??= 5;
    readonly = readonly == true;
    stateOn ??= "glyphicon-star";
    stateOff ??= "glyphicon-star-empty";
    titles = titles != null && titles.length > 0  ? titles : ["one", "two", "three", "four", "five"];
    ratingStates ??= [];
    range = _buildTemplateObjects();
  }

  // model -> view
  writeValue(num _value) {
    _value ??= 0;
    if (_value != 0) {
      value = _value.round();
      preValue = _value;
      return;
    }
    preValue = _value;
    value = _value;

  }

  _buildTemplateObjects() {
    var count = or(ratingStates.length, max) ;
    var result = [];
    for (var i = 0; i < count; i++) {
      result.add({
        "index" : i,
        "stateOn" : stateOn,
        "stateOff" : stateOff,
        "title" : titles.length > i ? titles[i] : i + 1,
      }..addAll(ratingStates.length > i ? ratingStates[i] : {}));
    }
    return result;
  }

  rate(num value) {
    if (!readonly && value >= 0 && value <= range.length) {
      writeValue(value);
      cd.viewToModelUpdate(value);
    }
  }

  enter(num _value) {
    if (!readonly) {
      value = _value;
      onHover.add(_value);
    }
  }

  reset() {
    value = preValue;
    onLeave.add(value);
  }

  onKeydown(KeyboardEvent event) {
    if (![37, 38, 39, 40].contains(event.which)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    var sign = event.which == 38 || event.which == 39
        ? 1
        : -1;
    rate(value + sign);
  }
}