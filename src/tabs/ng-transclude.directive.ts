import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngTransclude]'
})
export class NgTranscludeDirective {
  viewRef: ViewContainerRef;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _ngTransclude?: TemplateRef<any>;

  @Input()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set ngTransclude(templateRef: TemplateRef<any> | undefined) {
    this._ngTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get ngTransclude(): TemplateRef<any> | undefined {
    return this._ngTransclude;
  }

  constructor(viewRef: ViewContainerRef) {
    this.viewRef = viewRef;
  }
}
