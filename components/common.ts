import {
  Directive, Input, TemplateRef, ViewContainerRef
} from '@angular/core';

export interface KeyAttribute {
  [key:string]:any;
}

@Directive({
  selector: '[ngTransclude]'
})
export class NgTranscludeDirective {
  public viewRef:ViewContainerRef;

  private _ngTransclude:TemplateRef<any>;

  @Input()
  private set ngTransclude(templateRef:TemplateRef<any>) {
    this._ngTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  private get ngTransclude():TemplateRef<any> {
    return this._ngTransclude;
  }

  public constructor(private _viewRef:ViewContainerRef) {
    this.viewRef = _viewRef;
  }
}
