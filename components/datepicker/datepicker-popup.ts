import {
  Component, View, Host, Directive,
  OnInit, EventEmitter, NgControl,
  DefaultValueAccessor, ComponentRef, ViewEncapsulation, ControlValueAccessor,
  ElementRef, ViewContainerRef, DynamicComponentLoader,
  NgIf, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES,
  Self, NgModel, Renderer, NgStyle
} from 'angular2/core';

// import {setProperty} from 'angular2/src/forms/directives/shared';
// import {DOM} from 'angular2/src/dom/dom_adapter';

import {bind, Injectable, forwardRef, ResolvedBinding, Injector} from 'angular2/core';
import {positionService} from '../position';
import * as moment from 'moment';

import {DatePickerInner} from './datepicker-inner';
import {DayPicker} from './daypicker';
import {MonthPicker} from './monthpicker';
import {YearPicker} from './yearpicker';
import {DatePicker} from './datepicker';

class PopupOptions {
  public placement:string;
  public animation:boolean;
  public isOpen:boolean;

  constructor(options:Object) {
    Object.assign(this, options);
  }
}

const datePickerPopupConfig:Object = {
  datepickerPopup: 'YYYY-MM-dd',
  currentText: 'Today',
  clearText: 'Clear',
  closeText: 'Done',
  closeOnDateSelection: true,
  showButtonBar: true,
  onOpenFocus: true
};

@Component({
  selector: 'popup-container',
  events: ['update1']
})
@View({
  template: `
    <ul class="dropdown-menu"
        style="display: block"
        [ngStyle]="{top: top, left: left, display: display}"
        [ngClass]="classMap">
        <li>
             <datepicker (cupdate)="onUpdate($event)" *ngIf="popupComp" [(ngModel)]="popupComp.cd.model" [show-weeks]="true"></datepicker>
        </li>
        <li *ngIf="showButtonBar" style="padding:10px 9px 2px">
            <span class="btn-group pull-left">
                 <button type="button" class="btn btn-sm btn-info" (click)="select('today')" ng-disabled="isDisabled('today')">{{ getText('current') }}</button>
                 <button type="button" class="btn btn-sm btn-danger" (click)="select(null)">{{ getText('clear') }}</button>
            </span>
            <button type="button" class="btn btn-sm btn-success pull-right" (click)="close()">{{ getText('close') }}</button>
        </li>
    </ul>`,
  directives: [NgClass, NgStyle, DatePicker, FORM_DIRECTIVES, CORE_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})
class PopupContainer {
  public popupComp:DatePickerPopup;

  private classMap:Object;
  private top:string;
  private left:string;
  private display:string;
  private placement:string;
  private showButtonBar:boolean = true;
  private update1:EventEmitter = new EventEmitter();

  constructor(public element:ElementRef, options:PopupOptions) {
    Object.assign(this, options);
    this.classMap = {'in': false};
    this.classMap[options.placement] = true;
  }

  public onUpdate($event) {
    console.log('update', $event);
    if ($event) {
      if (typeof $event !== 'Date') {
        $event = new Date($event);
      }

      this.popupComp.activeDate = $event;
      // this.popupComp.cd.viewToModelUpdate($event);
    }
  }

  public position(hostEl:ElementRef) {
    this.display = 'block';
    this.top = '0px';
    this.left = '0px';
    let p = positionService
      .positionElements(hostEl.nativeElement,
      this.element.nativeElement.children[0],
      this.placement, false);
    this.top = p.top + 'px';
  }

  private getText(key:string):string {
    return this[key + 'Text'] || datePickerPopupConfig[key + 'Text'];
  }

  private isDisabled(date:Date):boolean {
    return false;
  }
}

@Directive({
  selector: '[datepicker-popup][ngModel]',
  // prop -> datepickerPopup - format
  properties: ['datepickerPopup', 'isOpen'],
  host: {'(cupdate)': 'onUpdate1($event)'}
})
export class DatePickerPopup implements OnInit {
  private _activeDate:Date;
  private placement:string = 'bottom';
  private _isOpen:boolean = false;
  private popup:Promise<ComponentRef>;

  constructor(@Self() public cd:NgModel, public element:ElementRef, public renderer:Renderer, public loader:DynamicComponentLoader) {
    this.activeDate = cd.model;
  }

  public get activeDate():Date {
    return this._activeDate;
  }

  public set activeDate(value:Date) {
    this._activeDate = value;
    // setProperty(this.renderer, this.element, 'value', value.toString());
    // this.ngModelChanged.next(value);
  }

  private get isOpen():boolean {
    return this._isOpen;
  }

  private set isOpen(value:boolean) {
    let fn = () => {
      this._isOpen = value;
    };

    if (value === true) {
      this.show(fn);
    }

    if (value === false) {
      this.hide(fn);
    }
  }

  ngOnInit() {
  }

  private show(cb:Function) {
    let options = new PopupOptions({
      placement: this.placement
    });

    let binding = Injector.resolve([
      bind(PopupOptions).toValue(options)
    ]);

    this.popup = this.loader
      .loadNextToLocation(PopupContainer, this.element, binding)
      .then((componentRef:ComponentRef) => {
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

  public hide(cb:Function) {
    if (this.popup) {
      this.popup.then((componentRef:ComponentRef) => {
        componentRef.dispose();
        cb();
        return componentRef;
      });
    } else {
      cb();
    }
  }
}
