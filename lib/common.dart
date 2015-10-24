import "package:angular2/angular2.dart";

@Directive (selector: "[ng-transclude]", inputs: const [ "ngTransclude"])
class NgTransclude {
  ViewContainerRef viewRef;

  TemplateRef _ngTransclude;

  set ngTransclude(TemplateRef templateRef) {
    _ngTransclude = templateRef;
    if (templateRef != null) {
      viewRef.createEmbeddedView(templateRef);
    }
  }

  get ngTransclude {
    return _ngTransclude;
  }

  NgTransclude(@Inject(ViewContainerRef) this.viewRef);
}