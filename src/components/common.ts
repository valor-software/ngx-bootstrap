/// <reference path="../../typings/tsd.d.ts" />

import {Directive, TemplateRef, ViewContainerRef} from 'angular2/angular2';

@Directive({
  selector: '[ng-transclude]',
  properties: ['ngTransclude']
})
export class NgTransclude {
  private _ngTransclude:any;

  private set ngTransclude(templateRef:TemplateRef) {
    this._ngTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  private get ngTransclude() {
    return this._ngTransclude;
  }

  constructor(public viewRef:ViewContainerRef) {
  }
}
