/**
 * @author ng-team
 * @copyright ng-bootstrap
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ClassDesc, MethodDesc, signature, NgApiDoc } from '../api-docs.model';
import { Analytics } from '../analytics/analytics';

/**
 * Displays the API docs of a class, which is not a directive.
 *
 * For Config services, use NgbdApiDocsConfig instead.
 */
@Component({
  selector: 'ng-api-doc-class',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './api-doc-class.component.html'
})
export class NgApiDocClassComponent {
  @Input()
  public set type(typeName: string) {
    this.apiDocs = this.docs[typeName];
  }

  public apiDocs: ClassDesc;

  private _analytics: Analytics;
  private docs: NgApiDoc;

  public constructor(_analytics: Analytics, docs: NgApiDoc) {
    this.docs = docs;
    this._analytics = _analytics;
  }

  public methodSignature(method: MethodDesc): string {
    return signature(method);
  }

  public trackSourceClick(): void {
    this._analytics.trackEvent('Source File View', this.apiDocs.className);
  }
}
