import {Directive, TemplateRef, ViewContainerRef, Inject} from 'angular2/core';

export interface IAttribute {
  [key:string]:any;
}

@Directive({
  selector: '[ngTransclude]',
  properties: ['ngTransclude']
})
export class NgTransclude {
  public viewRef:ViewContainerRef;

  private _ngTransclude:TemplateRef;

  private set ngTransclude(templateRef:TemplateRef) {
    this._ngTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  private get ngTransclude():TemplateRef {
    return this._ngTransclude;
  }

  public constructor(@Inject(ViewContainerRef) _viewRef:ViewContainerRef) {
    this.viewRef = _viewRef;
  }
}

export class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
}
