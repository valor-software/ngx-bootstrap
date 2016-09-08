import {
  Component, ComponentRef, Directive, ElementRef, EventEmitter, Input, Output,
  ReflectiveInjector, Renderer, Self, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { NgModel } from '@angular/forms';

import { KeyAttribute } from '../common';
import { positionService } from '../position';
import { ComponentsHelper } from '../utils/components-helper.service';

export class PopupOptions {
  public placement:string;
  public animation:boolean;
  public isOpen:boolean;

  public constructor(options:Object) {
    Object.assign(this, options);
  }
}

const datePickerPopupConfig:KeyAttribute = {
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
  template: `
    <ul class="dropdown-menu"
        style="display: block"
        [ngStyle]="{top: top, left: left, display: display}"
        [ngClass]="classMap">
        <li>
             <datepicker (selectionDone)="onUpdate($event)" *ngIf="popupComp" [(ngModel)]="popupComp.cd.model" [showWeeks]="true"></datepicker>
        </li>
        <li *ngIf="showButtonBar" style="padding:10px 9px 2px">
            <span class="btn-group pull-left">
                 <button type="button" class="btn btn-sm btn-info" (click)="select('today')" ng-disabled="isDisabled('today')">{{ getText('current') }}</button>
                 <button type="button" class="btn btn-sm btn-danger" (click)="select(null)">{{ getText('clear') }}</button>
            </span>
            <button type="button" class="btn btn-sm btn-success pull-right" (click)="close()">{{ getText('close') }}</button>
        </li>
    </ul>`,
  encapsulation: ViewEncapsulation.None
})
export class PopupContainerComponent {
  public popupComp:DatePickerPopupDirective;

  private classMap:any;
  private top:string;
  private left:string;
  private display:string;
  private placement:string;

  // false positive
  /* tslint:disable:no-unused-variable */
  private showButtonBar:boolean = true;

  @Output()
  private update1:EventEmitter<any> = new EventEmitter(false);
  /* tslint:enable:no-unused-variable */

  private element:ElementRef;

  public constructor(element:ElementRef, options:PopupOptions) {
    this.element = element;
    Object.assign(this, options);
    this.classMap = {'in': false};
    this.classMap[options.placement] = true;
  }

  public onUpdate($event:any):void {
    console.log('update', $event);
    if ($event) {
      if ($event.toString() !== '[object Date]') {
        $event = new Date($event);
      }

      this.popupComp.activeDate = $event;
      // this.popupComp.cd.viewToModelUpdate($event);
    }
  }

  public position(hostEl:ElementRef):void {
    this.display = 'block';
    this.top = '0px';
    this.left = '0px';
    let p = positionService
      .positionElements(hostEl.nativeElement,
        this.element.nativeElement.children[0],
        this.placement, false);
    this.top = p.top + 'px';
  }

  public getText(key:string):string {
    return (this as KeyAttribute)[key + 'Text'] || datePickerPopupConfig[key + 'Text'];
  }

  public isDisabled(/*date:Date*/):boolean {
    return false;
  }
}

@Directive({
  selector: '[datepickerPopup][ngModel]'/*,
   // prop -> datepickerPopup - format
   host: {'(cupdate)': 'onUpdate1($event)'}*/
})
export class DatePickerPopupDirective {
  public cd:NgModel;
  public viewContainerRef:ViewContainerRef;
  public renderer:Renderer;
  public componentsHelper:ComponentsHelper;

  private _activeDate:Date;
  private _isOpen:boolean = false;
  private placement:string = 'bottom';
  private popup:ComponentRef<PopupContainerComponent>;

  public constructor(@Self() cd:NgModel, viewContainerRef:ViewContainerRef,
                     renderer:Renderer, componentsHelper:ComponentsHelper) {
    this.cd = cd;
    this.viewContainerRef = viewContainerRef;
    this.renderer = renderer;
    this.componentsHelper = componentsHelper;
    this.activeDate = cd.model;
  }

  public get activeDate():Date {
    return this._activeDate;
  }

  public set activeDate(value:Date) {
    this._activeDate = value;
  }

  private get isOpen():boolean {
    return this._isOpen;
  }

  @Input()
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

  public hide(cb:Function):void {
    if (this.popup) {
      this.popup.destroy();
    }
    cb();
  }

  private show(cb:Function):void {
    let options = new PopupOptions({
      placement: this.placement
    });

    let binding = ReflectiveInjector.resolve([
      {provide: PopupOptions, useValue: options}
    ]);

    this.popup = this.componentsHelper.appendNextToLocation(PopupContainerComponent, this.viewContainerRef, binding);
    this.popup.instance.position(this.viewContainerRef.element);
    this.popup.instance.popupComp = this;
    /*componentRef.instance.update1.observer({
     next: (newVal) => {
     setProperty(this.renderer, this.elementRef, 'value', newVal);
     }
     });*/

    cb();
  }
}
