/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Host, Directive, OnInit, EventEmitter, NgControl, DefaultValueAccessor, ComponentRef, ViewEncapsulation, ControlValueAccessor, ElementRef, ViewContainerRef, DynamicComponentLoader, NgIf, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES, Self, NgModel, Renderer, NgStyle;
// import {setProperty} from 'angular2/src/forms/directives/shared';

// import {DOM} from 'angular2/src/dom/dom_adapter';
import "package:angular2/di.dart"
    show bind, Injectable, ResolvedBinding, Injector;
import "../position.dart" show positionService;
import "package:moment.dart" as moment;
import "datepicker-inner.dart" show DatePickerInner;
import "daypicker.dart" show DayPicker;
import "monthpicker.dart" show MonthPicker;
import "yearpicker.dart" show YearPicker;
import "datepicker.dart" show DatePicker;

class PopupOptions {
  String placement;

  bool animation;

  bool isOpen;

  PopupOptions(Object options) {
    Object.assign(this, options);
  }
}

const Object datePickerPopupConfig = {
  "datepickerPopup" : "YYYY-MM-dd",
  "currentText" : "Today",
  "clearText" : "Clear",
  "closeText" : "Done",
  "closeOnDateSelection" : true,
  "showButtonBar" : true,
  "onOpenFocus" : true
};

@Component (selector: "popup-container", events: const [ "update1"])
@View (template: '''
    <ul class="dropdown-menu"
        style="display: block"
        [ng-style]="{top: top, left: left, display: display}"
        [ng-class]="classMap">
        <li>
             <datepicker (cupdate)="onUpdate(\$event)" *ng-if="popupComp" [(ng-model)]="popupComp.cd.model" [show-weeks]="true"></datepicker>
        </li>
        <li *ng-if="showButtonBar" style="padding:10px 9px 2px">
            <span class="btn-group pull-left">
                 <button type="button" class="btn btn-sm btn-info" (click)="select(\'today\')" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>
                 <button type="button" class="btn btn-sm btn-danger" (click)="select(null)">{{ getText(\'clear\') }}</button>
            </span>
            <button type="button" class="btn btn-sm btn-success pull-right" (click)="close()">{{ getText(\'close\') }}</button>
        </li>
    </ul>''',
    directives: const [
      NgClass, NgStyle, DatePicker, FORM_DIRECTIVES, CORE_DIRECTIVES],
    encapsulation: ViewEncapsulation.None)
class PopupContainer {
  ElementRef element;

  DatePickerPopup popupComp;

  Object classMap;

  String top;

  String left;

  String display;

  String placement;

  bool showButtonBar = true;

  EventEmitter update1 = new EventEmitter ();

  PopupContainer(this .element, PopupOptions options) {
    Object.assign(this, options);
    this.classMap = { "in" : false};
    this.classMap [ options.placement ] = true;
  }

  onUpdate($event) {
    console.log("update", $event);
    if ($event) {
      if (!identical(, "DateTime")) {
        $event = new DateTime ($event);
      }
      this.popupComp.activeDate = $event;
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
  }

  String getText(String key) {
    return this [ key + "Text" ] || datePickerPopupConfig [ key + "Text" ];
  }

  bool isDisabled(DateTime date) {
    return false;
  }
}

@Directive (selector: "[datepicker-popup][ng-model]",
    properties: const [ "datepickerPopup", "isOpen"],
    host: const { "(cupdate)" : "onUpdate1(\$event)"})
class DatePickerPopup implements OnInit {
  NgModel cd;

  ElementRef element;

  Renderer renderer;

  DynamicComponentLoader loader;

  DateTime _activeDate;

  String placement = "bottom";

  bool _isOpen = false;

  Promise <ComponentRef> popup;

  DatePickerPopup(@Self () this .cd, this .element, this .renderer,
      this .loader) {
    this.activeDate = cd.model;
  }

  DateTime get activeDate {
    return this._activeDate;
  }

  set activeDate(DateTime value) {
    this._activeDate = value;
  }

  bool get isOpen {
    return this._isOpen;
  }

  set isOpen(bool value) {
    var fn = () {
      this._isOpen = value;
    };
    if (identical(value, true)) {
      this.show(fn);
    }
    if (identical(value, false)) {
      this.hide(fn);
    }
  }

  onInit() {}

  show(Function cb) {
    var options = new PopupOptions (placement: this.placement);
    var binding = Injector.resolve([ bind(PopupOptions).toValue(options)]);
    this.popup =
        this.loader.loadNextToLocation(PopupContainer, this.element, binding)
            .then((ComponentRef componentRef) {
          componentRef.instance.position(this.element);
          componentRef.instance.popupComp = this;
          /*componentRef.instance.update1.observer({
         next: (newVal) => {
         setProperty(this.renderer, this.elementRef, 'value', newVal);
         }
         });*/
          cb();
          return componentRef;
        });
  }

  hide(Function cb) {
    if (this.popup) {
      this.popup.then((ComponentRef componentRef) {
        componentRef.dispose();
        cb();
        return componentRef;
      });
    } else {
      cb();
    }
  }
}