part of ns_datepicker;

class PopupOptions {
  String placement;

  bool animation;

  bool isOpen;

  PopupOptions({this.placement, this.animation, this.isOpen});
}

@Component (selector: "popup-container", outputs: const [ "update1"])
@View (template: '''
    <ul class="dropdown-menu"
        style="display: block"
        [ng-style]="{top: top, left: left, display: display}"
        [ngClass]="classMap">
        <li>
             <datepicker (cupdate)="onUpdate(\$event)" *ngIf="popupComp" [(ng-model)]="popupComp.cd.model" [show-weeks]="true"></datepicker>
        </li>
        <li *ngIf="showButtonBar" style="padding:10px 9px 2px">
            <span class="btn-group pull-left">
                 <button type="button" class="btn btn-sm btn-info" (click)="select(\'today\')" ng-disabled="isDisabled(\'today\')">{{ currentText }}</button>
                 <button type="button" class="btn btn-sm btn-danger" (click)="select(null)">{{ clearText }}</button>
            </span>
            <button type="button" class="btn btn-sm btn-success pull-right" (click)="close()">{{ closeText }}</button>
        </li>
    </ul>''',
    directives: const [
      NgClass, NgStyle, DatePicker, FORM_DIRECTIVES, CORE_DIRECTIVES],
    encapsulation: ViewEncapsulation.None)
class PopupContainer {
  ElementRef element;

  DatePickerPopup popupComp;

  Map classMap;

  String top;

  String left;

  String display;

  String placement;

  String datepickerPopup = "YYYY-MM-dd";
  String currentText = "Today";
  String clearText = "Clear";
  String closeText = "Done";
  bool closeOnDateSelection = true;
  bool showButtonBar = true;
  bool onOpenFocus = true;

  EventEmitter update1 = new EventEmitter ();

  PopupContainer(this .element, PopupOptions options) {
    placement = options.placement;
//    isOpen =options.isOpen;
//    animation = options.animation;
    classMap = {"in" : false, placement : true};
  }

  onUpdate(event) {
    print("update $event");
    if (event) {
      if (event is! DateTime) {
        event = DateTime.parse(event);
      }
      this.popupComp.activeDate = event;
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

  bool isDisabled(DateTime date) {
    return false;
  }
}

@Directive (selector: "[datepicker-popup][ng-model]",
    inputs: const [ "datepickerPopup", "isOpen"],
    host: const { "(cupdate)" : "onUpdate1(\$event)"})
class DatePickerPopup implements OnInit {
  NgModel cd;

  ElementRef element;

  Renderer renderer;

  DynamicComponentLoader loader;

  DateTime _activeDate;

  String placement = "bottom";

  bool _isOpen = false;

  Future<ComponentRef> popup;

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

  ngOnInit() {}

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
    if (this.popup != null) {
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