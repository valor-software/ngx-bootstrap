/**
 * @author ng-team
 * @copyright ng-bootstrap
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  PropertyDesc,
  DirectiveDesc,
  InputDesc,
  MethodDesc,
  ClassDesc,
  signature,
  NgApiDoc
} from '../api-docs.model';
import { Analytics } from '../analytics/analytics';

/**
 * Displays the API docs of a directive.
 *
 * The default values of its inputs are looked for in the directive api doc itself, or in the matching property
 * of associated Config service, if any.
 *
 * The config service of a directive NgbFoo is, by convention, named NgbFooConfig.
 */
@Component({
  selector: 'ng-api-doc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './api-doc.component.html'
})
export class NgApiDocComponent {
  @Input()
  public set directive(directiveName: string) {
    this.apiDocs = this.docs[directiveName];
    this.configServiceName = `${directiveName}Config`;
    const configApiDocs = this.docs[this.configServiceName];
    this._configProperties = {};
    if (configApiDocs) {
      this.apiDocs.inputs.forEach(
        (input: InputDesc) =>
          (this._configProperties[input.name] = this._findInputConfigProperty(
            configApiDocs,
            input
          ))
      );
    }
  }

  public apiDocs: DirectiveDesc;
  public configServiceName: string;

  /**
   * Object which contains, for each input name of the directive, the corresponding property of the associated config
   * service (if any)
   */
  private _configProperties: { [propertyName: string]: PropertyDesc };
  private _analytics: Analytics;
  private docs: NgApiDoc;

  public constructor(_analytics: Analytics, docs: NgApiDoc) {
    this._analytics = _analytics;
    // todo: inject docs
    this.docs = docs;
  }

  /**
   * Returns the default value of the given directive input by first looking for it in the matching config service
   * property. If there is no matching config property, it reads it from the input.
   */
  public defaultInputValue(input: InputDesc): string {
    const configProperty = this._configProperties[input.name];
    return configProperty ? configProperty.defaultValue : input.defaultValue;
  }

  /**
   * Returns true if there is a config service property matching with the given directive input
   */
  public hasConfigProperty(input: InputDesc): boolean {
    return !!this._configProperties[input.name];
  }

  public methodSignature(method: MethodDesc): string {
    return signature(method);
  }

  public trackSourceClick(): void {
    this._analytics.trackEvent('Source File View', this.apiDocs.className);
  }

  private _findInputConfigProperty(
    configApiDocs: ClassDesc,
    input: InputDesc
  ): PropertyDesc {
    return configApiDocs.properties.filter(
      (prop: PropertyDesc) => prop.name === input.name
    )[0];
  }
}
