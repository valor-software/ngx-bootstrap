/// <reference path="../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Directive, TemplateRef, ViewContainerRef, Inject;

@Directive (selector: "[ng-transclude]", properties: const [ "ngTransclude"])
class NgTransclude {
  ViewContainerRef viewRef;

  TemplateRef _ngTransclude;

  set ngTransclude(TemplateRef templateRef) {
    this._ngTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  get ngTransclude {
    return this._ngTransclude;
  }

  NgTransclude(@Inject (ViewContainerRef) this .viewRef) {}
}