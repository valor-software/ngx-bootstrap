import {
  Directive, Input, TemplateRef, ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[ngTransclude]'
})
export class NgTranscludeDirective {
  public viewRef:ViewContainerRef;

  protected _viewRef:ViewContainerRef;
  protected _ngTransclude:TemplateRef<any>;

  @Input()
  public set ngTransclude(templateRef:TemplateRef<any>) {
    this._ngTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  public get ngTransclude():TemplateRef<any> {
    return this._ngTransclude;
  }

  public constructor(viewRef:ViewContainerRef) {
    this.viewRef = viewRef;
  }
}
