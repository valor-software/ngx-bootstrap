import "package:angular2/angular2.dart";
import "package:angular2/src/common/forms/directives/shared.dart";
//import "package:angular2/src/core/di.dart";
import "../ng2-bootstrap-config.dart";
import "../position.dart";
import 'dart:html';
import 'dart:async';
import 'package:node_shims/js.dart';

const TEMPLATE = const {
Ng2BootstrapTheme.BS4 :
'''
  <div class="dropdown-menu"
      [ng-style]="{top: top, left: left, display: display}"
      style="display: block">
      <a href="#"
         *ngFor="#match of matches"
         (click)="selectMatch(match, \$event)"
         [ngClass]="{active: isActive(match) }"
         (mouseenter)="selectActive(match)"
         class="dropdown-item"
         [inner-html]="hightlight(match, query)"></a>
  </div>
  ''',
  Ng2BootstrapTheme.BS3: '''
  <ul class="dropdown-menu"
      [ng-style]="{top: top, left: left, display: display}"
      style="display: block">
    <li *ngFor="#match of matches"
        [ngClass]="{active: isActive(match) }"
        (mouseenter)="selectActive(match)">
        <a href="#" (click)="selectMatch(match, \$event)" tabindex="-1" [inner-html]="hightlight(match, query)"></a>
    </li>
  </ul>
  '''
};

class TypeaheadOptions {
  String placement;

  bool animation;

  TypeaheadOptions({this.placement, this.animation});
}

@Component (selector: "n2s-typeahead-dropdown",
    template: '''
  <ul class="dropdown-menu"
      [ng-style]="{top: top, left: left, display: display}"
      style="display: block">
    <li *ngFor="#match of matches"
        [ngClass]="{active: isActive(match) }"
        (mouseenter)="selectActive(match)">
        <a href="#" (click)="selectMatch(match, \$event)" tabindex="-1" [innerHtml]="hightlight(match, query)"></a>
    </li>
  </ul>
  ''',
    styles: const ['''
n2s-typeahead-dropdown {
  position: absolute;
}
'''],
    directives: const [CORE_DIRECTIVES],
    encapsulation: ViewEncapsulation.None)
class TypeaheadContainer {
  ElementRef element;

  Typeahead parent;

  String query;

  List<String> _matches = [];

  String _active;

  String top;

  String left;

  String display;

  String placement;

  bool animation;

  TypeaheadContainer(this.element, TypeaheadOptions typeaheadOptions) :
        placement = typeaheadOptions.placement,
        animation = typeaheadOptions.animation;

  List<String> get matches {
    return _matches;
  }

  set matches(List<String> value) {
    _matches = value;
    if (_matches.length > 0) {
      _active = _matches [ 0 ];
    }
  }

  position(ElementRef hostEl) {
    display = "block";
    top = "0px";
    left = "0px";
    var p = positionService.positionElements(
        hostEl.nativeElement, element.nativeElement.children [ 0 ],
        placement, false);
    top = p.top.toString() + "px";
    left = p.left.toString() + "px";
  }

  selectActiveMatch() {
    selectMatch(_active);
  }

  prevActiveMatch() {
    var index = matches.indexOf(_active);
    _active =
    matches [ index - 1 < 0 ? matches.length - 1 : index - 1 ];
  }

  nextActiveMatch() {
    var index = matches.indexOf(_active);
    _active =
    matches [ index + 1 > matches.length - 1 ? 0 : index + 1 ];
  }

  selectActive(String value) {
    _active = value;
  }

  bool isActive(value) {
    return _active == value;
  }

  selectMatch(String value, [Event e = null]) {
    if (e != null) {
      e.stopPropagation();
      e.preventDefault();
    }
    parent.changeModel(value);
    parent.onSelect.add({'item': value});
    return false;
  }

  String escapeRegexp(String queryToEscape) {
    // Regex: capture the whole query string and replace it with the string that will be used to match

    // the results, for example if the capture is "a" the result will be \a
    return queryToEscape.replaceAll(new RegExp(r'([.?*+^$[\]\\(){}|-])'), "\\\$1");
  }

  hightlight(String item, String query) {
    // Replaces the capture string with a the same string inside of a "strong" tag
    return query != null && !query.isEmpty
        ? item.replaceAllMapped(new RegExp(escapeRegexp(query), caseSensitive: false), (m) => "<strong>${m[0]}</strong>")
        : item;
  }
}
// todo: options loading by http not yet implemented
@Component (
    selector: "n2s-typeahead",
    inputs: const [
      'context',
      "source",
      // todo: not yet implemented
      "appendToBody",
      // todo: not yet implemented
      "editable",
      // todo: not yet implemented
      "focusFirst",
      // todo: not yet implemented
      "inputFormatter",
      "minLength",
      // todo: not yet implemented
      "selectOnExact",
      // todo: not yet implemented
      "templateUrl",
      // todo: not yet implemented
      "popupTemplateUrl",
      "waitMs",
      "optionsLimit",
      // todo: not yet implemented
      "selectOnBlur",
      // todo: not yet implemented
      "focusOnSelect",
      "optionField",
      "async"
    ],
    outputs: const [
      "onLoading",
      "onNoResults",
      "onSelect"
    ],
    template: '<input type="text"[(ngModel)]="cd.model" (keyup)="onTypeaheadChange(\$event)" class="form-control">')
class Typeahead extends DefaultValueAccessor implements OnInit {
  NgModel cd;

  var context;

  ElementRef element;

  Renderer renderer;

  DynamicComponentLoader loader;

  EventEmitter onLoading = new EventEmitter ();

  EventEmitter onNoResults = new EventEmitter ();

  EventEmitter onSelect = new EventEmitter ();

  TypeaheadContainer container;

  num minLength = 1;

  num waitMs = 0;

  num optionsLimit = 20;

  bool appendToBody;

  bool editable;

  bool focusFirst;

  dynamic inputFormatter;

  bool selectOnExact;

  String templateUrl;

  String popupTemplateUrl;

  bool selectOnBlur;

  bool focusOnSelect;

  String optionField;

  bool async = false;

  Function debouncer;

  dynamic source;

  List<String> _matches = [];

  String placement = "bottom-left";

  Future<ComponentRef> popup;

  Typeahead(this.cd, Renderer renderer, ElementRef elementRef, this.loader)  :
        element = elementRef,
        renderer = renderer,
        super(renderer, elementRef) {
    cd.valueAccessor = this;
  }

  get matches => _matches;

  Function debounce(Function func, num wait) {
    dynamic timeout;
//    List<dynamic> args;
    DateTime timestamp;
    num waitOriginal = wait;
    return () {
      // save details of latest call
//      args = [].slice.call(arguments, 0);
      timestamp = new DateTime.now();
      // trick is about implementing of 'typeaheadWaitMs'

      // in this case we have adaptive 'wait' parameter

      // we should use standard 'wait'('waitOriginal') in case of

      // popup is opened, otherwise - 'typeaheadWaitMs' parameter
      wait =truthy(container) ? waitOriginal : waitMs;
      // this is where the magic happens
      later() {
        // how long ago was the last call
        var last = new DateTime.now().difference(timestamp).inMilliseconds;
        // if the latest call was less than the wait period ago
        // then we reset the timeout to wait for the difference
        if (last < wait) {
          timeout = new Timer(new Duration(milliseconds: wait - last), later);
        } else {
          timeout = null;
          func();
        }
      };
      // we only need to set the timer now if one isn't already running
      if (falsey(timeout)) {
        timeout = new Timer(new Duration(milliseconds: wait), later);
      }
    };
  }

  processMatches() {
    _matches = [];
    if (cd.model.toString().length >= minLength) {
      for (var i = 0; i < source.length; i ++) {
        String match;
        if (source[i] is Map && truthy(source[i][optionField])) {
          match = source[i][optionField];
        }
        if (source[i] is String) {
          match = source[i];
        }
        if (falsey(match)) {
          print("Invalid match type $optionField");
          continue;
        }
        if (match.toLowerCase().indexOf(cd.model.toString().toLowerCase()) >= 0) {
          _matches.add(match);
          if (_matches.length > optionsLimit - 1) {
            break;
          }
        }
      }
    }
  }

  finalizeAsyncCall() {
    onLoading.add(false);
    onNoResults.add(cd.model.toString().length >= minLength && matches.length <= 0);
    if (cd.model.toString().length <= 0 || _matches.length <= 0) {
      hide();
      return;
    }
    if (truthy(container) && _matches.length > 0) {
      container.query = cd.model;
      container.matches = _matches;
    }
    if (falsey(container) && _matches.length > 0) {
      show(_matches);
    }
  }

  ngOnInit() {
    // async should be false in case of array
    async = source is Function;

    if (async == true) {
      debouncer = debounce(() {
        if (source is Function) {
          source(context).then((Iterable matches) {
            _matches = [];
            if (cd.model.toString().length >= minLength) {
              for (var i = 0; i < matches.length; i ++) {
                _matches.add(matches.elementAt(i));
                if (_matches.length > optionsLimit - 1) {
                  break;
                }
              }
            }
            finalizeAsyncCall();
          });
        } else if (source is List && source.length > 0) { // source is array
          processMatches();
          finalizeAsyncCall();
        }
      }, 100);
    }
  }

  onTypeaheadChange(KeyboardEvent e) {
    if (truthy(container)) {
      switch(e.keyCode) {
        case KeyCode.ESC:
        hide();
        return;
        case KeyCode.UP:
        container.prevActiveMatch();
        return;
        case KeyCode.DOWN:
        container.nextActiveMatch();
        return;
        case KeyCode.ENTER:
        container.selectActiveMatch();
        return;
      }
    }
    onLoading.add(true);
    if (async == true) {
      debouncer();
    } else {
      processMatches();
      finalizeAsyncCall();
    }
  }

  changeModel(value) {
    cd.viewToModelUpdate(value);
//    setProperty(renderer, element, "value", value);
    hide();
  }

  show(List<String> matches) {
    var options = new TypeaheadOptions (placement: placement, animation: false);
    var binding = Injector.resolve([ bind(TypeaheadOptions).toValue(options)]);
    popup = loader.loadNextToLocation(
        TypeaheadContainer, element, binding).then((ComponentRef componentRef) {
      componentRef.instance.position(element);
      container = componentRef.instance;
      container.parent = this;
      container.query = cd.model;
      container.matches = matches;
      element.nativeElement.focus();
      return componentRef;
    });
  }

  hide() {
    if (truthy(container)) {
      popup.then((ComponentRef componentRef) {
        componentRef.dispose();
        container = null;
        return componentRef;
      });
    }
  }
}