import "package:angular2/angular2.dart";
import 'dart:html';
import 'package:node_shims/js.dart';

// TODO: templateUrl
@Component (selector: "rating[ng-model]",
    inputs: const [
      "max", "readonly", "titles", "stateOn", "stateOff", "ratingStates", 'value: ngModel'],
    outputs: const [ "onHover", "onLeave", 'valueEmitter: ngModel'],
    host: const { "(keydown)" : "onKeydown(\$event)"})
@View (template: '''
    <span (mouseleave)="reset()" (keydown)="onKeydown(\$event)" tabindex="0" role="slider" aria-valuemin="0" [attr.aria-valuemax]="range.length" [attr.aria-valuenow]="value">
      <template ng-for #r [ng-for-of]="range" #index="index">
        <span class="sr-only">({{ index < value ? '*' : ' ' }})</span>
        <i (mouseenter)="enter(index + 1)" (click)="rate(index + 1)" class="glyphicon" [ng-class]="index < value ? r['stateOn'] : r['stateOff']" [title]="r['title']" ></i>
      </template>
    </span>
  ''', directives: const [NgClass, NgFor])
class Rating extends DefaultValueAccessor implements OnInit {
  num max;

  List range;

  num _value = 0;

  get value => _value;

  set value(num value) {
    value ??= 0;
    _value = value != 0
      ? value.round()
      : value;
    valueEmitter.add(_value);
  }

  EventEmitter valueEmitter = new EventEmitter();

  num preValue;

  List<String> titles;

  String stateOn;

  String stateOff;

  bool readonly;

  List ratingStates;

  EventEmitter onHover = new EventEmitter ();

  EventEmitter onLeave = new EventEmitter ();

  Rating(Renderer renderer, ElementRef elementRef)
      : super (renderer, elementRef) ;

  onInit() {
    max ??= 5;
    readonly = readonly == true;
    stateOn ??= "glyphicon-star";
    stateOff ??= "glyphicon-star-empty";
    titles = titles != null && titles.length > 0  ? titles : ["one", "two", "three", "four", "five"];
    ratingStates ??= [];
    range = _buildTemplateObjects();
    preValue = value;
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

  rate(num _value) {
    if (!readonly && _value >= 0 && _value <= range.length) {
      value = _value;
      preValue = _value;
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