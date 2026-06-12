import { Directive, TemplateRef, ViewContainerRef, input, effect } from '@angular/core';

@Directive({
    selector: '[ngTransclude]',
    standalone: true
})
export class NgTranscludeDirective {
  viewRef: ViewContainerRef;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _ngTransclude?: TemplateRef<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ngTransclude = input<TemplateRef<any> | undefined>();

  constructor(viewRef: ViewContainerRef) {
    this.viewRef = viewRef;
    
    effect(() => {
      const templateRef = this.ngTransclude();
      this._ngTransclude = templateRef;
      if (templateRef) {
        this.viewRef.createEmbeddedView(templateRef);
      }
    });
  }
}
