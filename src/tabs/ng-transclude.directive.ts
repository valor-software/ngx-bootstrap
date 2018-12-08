import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngTransclude]'
})
export class NgTranscludeDirective {
  viewRef: ViewContainerRef;

  protected _viewRef: ViewContainerRef;
  /* tslint:disable-next-line:no-any */
  protected _ngTransclude: TemplateRef<any>;

  @Input()
  /* tslint:disable-next-line:no-any */
  set ngTransclude(templateRef: TemplateRef<any>) {
    this._ngTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  /* tslint:disable-next-line:no-any */
  get ngTransclude(): TemplateRef<any> {
    return this._ngTransclude;
  }

  constructor(viewRef: ViewContainerRef) {
    this.viewRef = viewRef;
  }
}
