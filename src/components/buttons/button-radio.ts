/// <reference path="../../../typings/tsd.d.ts" />

import {
  Component, View,
  LifecycleEvent, EventEmitter,
  ElementRef, ViewContainerRef,
  NgIf, CSSClass
} from 'angular2/angular2';

// TODO: templateUrl
@Component({
  selector: 'btn-radio',
  properties: [],
  events: [],
  lifecycle: []
})
@View({
  template: `
  <span>Radio button</span>
  `,
  directives: [NgIf, CSSClass]
})
export class ButtonRadio {

}
