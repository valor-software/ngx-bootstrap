/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Directive, Component, View, Self, NgModel, EventEmitter, OnInit, ElementRef, DefaultValueAccessor, NgClass, NgStyle, Renderer, CORE_DIRECTIVES, ViewRef, ViewContainerRef, TemplateRef, DynamicComponentLoader, ComponentRef, ViewEncapsulation;
import "package:angular2/src/forms/directives/shared.dart" show setProperty;
import "package:angular2/di.dart"
    show bind, Injectable, ResolvedBinding, Injector;
import "../ng2-bootstrap-config.dart"
    show Ng2BootstrapConfig, Ng2BootstrapTheme;
import "../position.dart" show positionService;

const TEMPLATE = {
:
'''
  <div class="dropdown-menu"
      [ng-style]="{top: top, left: left, display: display}"
      style="display: block">
      <a href="#"
         *ng-for="#match of matches"
         (click)="selectMatch(match, \$event)"
         [ng-class]="{active: isActive(match) }"
         (mouseenter)="selectActive(match)"
         class="dropdown-item"
         [inner-html]="hightlight(match, query)"></a>
  </div>
  ''', : '''
  <ul class="dropdown-menu"
      [ng-style]="{top: top, left: left, display: display}"
      style="display: block">
    <li *ng-for="#match of matches"
        [ng-class]="{active: isActive(match) }"
        (mouseenter)="selectActive(match)">
        <a href="#" (click)="selectMatch(match, \$event)" tabindex="-1" [inner-html]="hightlight(match, query)"></a>
    </li>
  </ul>
  '''
};

class TypeaheadOptions {
  String placement;

  bool animation;

  TypeaheadOptions(TypeaheadOptions options) {
    Object.assign(this, options);
  }
}

@Component (selector: "typeahead-container")
@View (template: TEMPLATE [ Ng2BootstrapConfig.theme ],
    directives: const [ CORE_DIRECTIVES, NgClass, NgStyle],
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

  TypeaheadContainer(this .element, TypeaheadOptions options) {
    Object.assign(this, options);
  }

  List<String> get matches {
    return this._matches;
  }

  set matches(List<String> value) {
    this._matches = value;
    if (this._matches.length > 0) {
      this._active = this._matches [ 0 ];
    }
  }

  position(ElementRef hostEl) {
    this.display = "block";
    this.top = "0px";
    this.left = "0px";
    var p = positionService.positionElements(
        hostEl.nativeElement, this.element.nativeElement.children [ 0 ],
        this.placement, false);
    this.top = p.top + "px";
    this.left = p.left + "px";
  }

  selectActiveMatch() {
    this.selectMatch(this._active);
  }

  prevActiveMatch() {
    var index = this.matches.indexOf(this._active);
    this._active =
    this.matches [ index - 1 < 0 ? this.matches.length - 1 : index - 1 ];
  }

  nextActiveMatch() {
    var index = this.matches.indexOf(this._active);
    this._active =
    this.matches [ index + 1 > this.matches.length - 1 ? 0 : index + 1 ];
  }

  selectActive(String value) {
    this._active = value;
  }

  bool isActive(value) {
    return identical(this._active, value);
  }

  selectMatch(String value, [ Event e = null ]) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.parent.changeModel(value);
    this.parent.typeaheadOnSelect.next(item: value);
    return false;
  }

  escapeRegexp(queryToEscape) {
    // Regex: capture the whole query string and replace it with the string that will be used to match

    // the results, for example if the capture is "a" the result will be \a
    return queryToEscape.replace(
        new RegExp (r'([.?*+^$[\]\\(){}|-])'), "\\\$1");
  }

  hightlight(String item, String query) {
    // Replaces the capture string with a the same string inside of a "strong" tag
    return query
        ? item.replace(
        new RegExp (this.escapeRegexp(query), "gi"), "<strong>\$&</strong>")
        : item;
  }
}
// todo: options loading by http not yet implemented
@Directive (
    selector: "typeahead, [typeahead]",
    properties: const [
      "source:typeahead",
      // todo: not yet implemented
      "appendToBody:typeaheadAppendToBody",
      // todo: not yet implemented
      "editable:typeaheadEditable",
      // todo: not yet implemented
      "focusFirst:typeaheadFocusFirst",
      // todo: not yet implemented
      "inputFormatter:typeaheadInputFormatter",
      "minLength:typeaheadMinLength",
      // todo: not yet implemented
      "selectOnExact:typeaheadSelectOnExact",
      // todo: not yet implemented
      "templateUrl:typeaheadTemplateUrl",
      // todo: not yet implemented
      "popupTemplateUrl:typeaheadPopupTemplateUrl",
      "waitMs:typeaheadWaitMs",
      "optionsLimit:typeaheadOptionsLimit",
      // todo: not yet implemented
      "selectOnBlur:typeaheadSelectOnBlur",
      // todo: not yet implemented
      "focusOnSelect:typeaheadFocusOnSelect",
      "field:typeaheadOptionField",
      "async:typeaheadAsync"
    ],
    events: const ["typeaheadLoading", "typeaheadNoResults", "typeaheadOnSelect"
    ],
    host: const { "(keyup)" : "onChange(\$event)"})
class Typeahead implements OnInit {
  NgModel cd;

  ElementRef element;

  Renderer renderer;

  DynamicComponentLoader loader;

  EventEmitter typeaheadLoading = new EventEmitter ();

  EventEmitter typeaheadNoResults = new EventEmitter ();

  EventEmitter typeaheadOnSelect = new EventEmitter ();

  TypeaheadContainer container;

  num minLength;

  num waitMs;

  num optionsLimit;

  bool appendToBody;

  bool editable;

  bool focusFirst;

  dynamic inputFormatter;

  bool selectOnExact;

  String templateUrl;

  String popupTemplateUrl;

  bool selectOnBlur;

  bool focusOnSelect;

  String field;

  bool async = null;

  Function debouncer;

  dynamic source;

  List<String> _matches = [];

  String placement = "bottom-left";

  Promise <ComponentRef> popup;

  Typeahead(this .cd, this .element, this .renderer, this .loader) {}

  get matches {
    return this._matches;
  }

  Function debounce(Function func, num wait) {
    dynamic timeout;
    List<dynamic> args;
    num timestamp;
    num waitOriginal = wait;
    return () {
      // save details of latest call
      args = [].slice.call(arguments, 0);
      timestamp = Date.now();
      // this trick is about implementing of 'typeaheadWaitMs'

      // in this case we have adaptive 'wait' parameter

      // we should use standard 'wait'('waitOriginal') in case of

      // popup is opened, otherwise - 'typeaheadWaitMs' parameter
      wait = this.container ? waitOriginal : this.waitMs;
      // this is where the magic happens
      var later = () {
        // how long ago was the last call
        var last = Date.now() - timestamp;
        // if the latest call was less that the wait period ago

        // then we reset the timeout to wait for the difference
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          func.apply(this, args);
        }
      };
      // we only need to set the timer now if one isn't already running
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  }

  processMatches() {
    this._matches = [];
    if (this.cd.model
        .toString()
        .length >= this.minLength) {
      for (var i = 0; i < this.source.length; i ++) {
        String match;
        if (identical(, "object") && this.source [ i ] [ this.field ]) {
          match = this.source [ i ] [ this.field ];
        }
        if (identical(, "string")) {
          match = this.source [ i ];
        }
        if (!match) {
          console.log("Invalid match type", , this .field);
          continue;
        }
        if (match.toLowerCase().indexOf(
            this.cd.model.toString().toLowerCase()) >= 0) {
          this._matches.push(match);
          if (this._matches.length > this.optionsLimit - 1) {
            break;
          }
        }
      }
    }
  }

  finalizeAsyncCall() {
    this.typeaheadLoading.next(false);
    this.typeaheadNoResults.next(this.cd.model
        .toString()
        .length >= this.minLength && this.matches.length <= 0);
    if (this.cd.model
        .toString()
        .length <= 0 || this._matches.length <= 0) {
      this.hide();
      return;
    }
    if (this.container && this._matches.length > 0) {
      this.container.query = this.cd.model;
      this.container.matches = this._matches;
    }
    if (!this.container && this._matches.length > 0) {
      this.show(this._matches);
    }
  }

  onInit() {
    this.optionsLimit = this.optionsLimit || 20;
    this.minLength = this.minLength || 1;
    this.waitMs = this.waitMs || 0;
    // async should be false in case of array
    if (identical(this.async, null) && !identical(, "function")) {
      this.async = false;
    }
    // async should be true for any case of function
    if (identical(, "function")) {
      this.async = true;
    }
    if (identical(this.async, true)) {
      this.debouncer = this.debounce(() {
        if (identical(, "function")) {
          this.source().then((matches) {
            this._matches = [];
            if (this.cd.model
                .toString()
                .length >= this.minLength) {
              for (var i = 0; i < matches.length; i ++) {
                this._matches.push(matches [ i ]);
                if (this._matches.length > this.optionsLimit - 1) {
                  break;
                }
              }
            }
            this.finalizeAsyncCall();
          });
        }
        // source is array
        if (identical(, "object") && this.source.length) {
          this.processMatches();
          this.finalizeAsyncCall();
        }
      }, 100);
    }
  }

  onChange(KeyboardEvent e) {
    if (this.container) {
      // esc
      if (identical(e.keyCode, 27)) {
        this.hide();
        return;
      }
      // up
      if (identical(e.keyCode, 38)) {
        this.container.prevActiveMatch();
        return;
      }
      // down
      if (identical(e.keyCode, 40)) {
        this.container.nextActiveMatch();
        return;
      }
      // enter
      if (identical(e.keyCode, 13)) {
        this.container.selectActiveMatch();
        return;
      }
    }
    this.typeaheadLoading.next(true);
    if (identical(this.async, true)) {
      this.debouncer();
    }
    if (identical(this.async, false)) {
      this.processMatches();
      this.finalizeAsyncCall();
    }
  }

  changeModel(value) {
    this.cd.viewToModelUpdate(value);
    setProperty(this.renderer, this.element, "value", value);
    this.hide();
  }

  show(List<String> matches) {
    var options = new TypeaheadOptions (
        placement: this.placement, animation: false);
    var binding = Injector.resolve([ bind(TypeaheadOptions).toValue(options)]);
    this.popup = this.loader.loadNextToLocation(
        TypeaheadContainer, this.element, binding).then((
        ComponentRef componentRef) {
      componentRef.instance.position(this.element);
      this.container = componentRef.instance;
      this.container.parent = this;
      this.container.query = this.cd.model;
      this.container.matches = matches;
      this.element.nativeElement.focus();
      return componentRef;
    });
  }

  hide() {
    if (this.container) {
      this.popup.then((ComponentRef componentRef) {
        componentRef.dispose();
        this.container = null;
        return componentRef;
      });
    }
  }
}

const List<dynamic> typeahead = [ Typeahead];