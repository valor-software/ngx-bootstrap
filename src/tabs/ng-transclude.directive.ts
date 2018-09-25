import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngTransclude]'
})
export class NgTranscludeDirective {
  viewRef: ViewContainerRef;

  protected _viewRef: ViewContainerRef;
  protected _ngTransclude: TemplateRef<object>;

  @Input()
  set ngTransclude(templateRef: TemplateRef<object>) {
    this._ngTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  get ngTransclude(): TemplateRef<object> {
    return this._ngTransclude;
  }

  constructor(viewRef: ViewContainerRef) {
    this.viewRef = viewRef;
  }
}
