import {Directive, TemplateRef, ViewContainerRef, Inject} from 'angular2/angular2';

export interface IAttribute {
  [name: string]: any;
}

@Directive({
  selector: '[ng-transclude]',
  properties: ['ngTransclude']
})
export class NgTransclude {
  private _ngTransclude: TemplateRef;

  private set ngTransclude(templateRef:TemplateRef) {
    this._ngTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  private get ngTransclude() {
    return this._ngTransclude;
  }

  constructor(@Inject(ViewContainerRef) public viewRef:ViewContainerRef) {
  }
}
