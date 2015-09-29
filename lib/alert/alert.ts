/// <reference path="../../tsd.d.ts" />

import {
  Component, View,
  OnInit, EventEmitter,
  ElementRef, ViewContainerRef,
  NgIf, NgClass
} from 'angular2/angular2';

// TODO: templateUrl
@Component({
  selector: 'alert',
  properties: ['type', 'dismissible', 'dismissOnTimeout'],
  events: ['close']
})
@View({
  template: `
  <div class="alert" role="alert" [ng-class]="classes" *ng-if="!closed">
    <button *ng-if="closeable" type="button" class="close" (click)="onClose($event)">
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </button>
    <ng-content></ng-content>
  </div>
  `,
  directives: [NgIf, NgClass]
})
export class Alert implements OnInit {
  type:string;
  close:EventEmitter = new EventEmitter();
  templateUrl:string;
  dismissOnTimeout:number;
  private closed:boolean;
  private closeable:boolean;
  private classes:Array<string> = [];

  private set dismissible(v:boolean){
    this.closeable = v;
  }
  private get dismissible():boolean{
    return this.closeable;
  }

  constructor(public el:ElementRef) {
    this.closeable = this.closeable || el.nativeElement.getAttribute('(close)');
  }

  onInit() {
    this.type = this.type || 'warning';
    this.classes[0] = 'alert-' + (this.type || 'warning');
    if (this.closeable) {
      this.classes[1] = 'alert-dismissible';
    } else {
      this.classes.length = 1;
    }

    if (this.dismissOnTimeout) {
      let close = this.onClose.bind(this);
      setTimeout(close, this.dismissOnTimeout);
    }
  }

  // todo: mouse event + touch + pointer
  onClose() {
    this.close.next(this);
    this.closed = true;
  }
}
