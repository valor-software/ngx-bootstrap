/// <reference path="../../../typings/tsd.d.ts" />

import {
  Component, View,
  LifecycleEvent, EventEmitter,
  ElementRef, ViewContainerRef,
  NgIf, CSSClass
} from 'angular2/angular2';

// TODO: templateUrl
@Component({
  selector: 'alert',
  properties: ['type', 'dismissOnTimeout: dismiss-on-timeout'],
  events: ['close'],
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
  <div class="alert" role="alert" [class]="classes" *ng-if="!closed">
    <button *ng-if="closeable" type="button" class="close" (^click)="onClose($event)">
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </button>
    <ng-content></ng-content>
  </div>
  `,
  directives: [NgIf, CSSClass]
})
export class AlertComponent {
  type:string;
  close:EventEmitter;
  templateUrl:string;
  dismissOnTimeout:number;
  private closed:boolean;
  private closeable:boolean;
  private classes:Array<string> = [];

  constructor(public el:ElementRef) {
    this.close = new EventEmitter();
    this.closeable = el.nativeElement.getAttribute('(close)');
  }

  onInit() {
    this.type = this.type || 'warning';
    this.classes[0] = 'alert-' + (this.type || 'warning');
    if (this.closeable) {
      this.classes[1] = 'alert-dismissible';
    }

    if (this.dismissOnTimeout) {
      let close = this.onClose.bind(this);
      setTimeout(close, this.dismissOnTimeout);
    }
  }

  // todo: mouse event + touch + pointer
  onClose($event:any) {
    this.close.next($event);
    this.closed = true;
  }
}
