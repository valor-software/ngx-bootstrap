import "package:angular2/angular2.dart";

@Directive (selector: "[ng-transclude]", properties: const [ "ngTransclude"])
class NgTransclude {
  ViewContainerRef viewRef;

  TemplateRef _ngTransclude;

  set ngTransclude(TemplateRef templateRef) {
    this._ngTransclude = templateRef;
    if (templateRef != null) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  get ngTransclude {
    return this._ngTransclude;
  }

  NgTransclude(@Inject (ViewContainerRef) this .viewRef) {}
}