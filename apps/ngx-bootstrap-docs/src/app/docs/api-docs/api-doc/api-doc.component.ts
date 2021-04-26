/**
 * @author ng-team
 * @copyright ng-bootstrap
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ComponentApi } from '../../models/components-api.model';
import { Analytics } from '../analytics/analytics';
import { ClassDesc, DirectiveDesc, InputDesc, MethodDesc, NgApiDoc, PropertyDesc, signature } from '../api-docs.model';

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
  apiDocs: DirectiveDesc;
  configServiceName: string;
  headerAnchor: string;

  /**
   * Object which contains, for each input name of the directive, the corresponding property of the associated config
   * service (if any)
   */

  private configProperties: { [propertyName: string]: PropertyDesc };
  private analytics: Analytics;
  private docs: NgApiDoc;

  constructor(analytics: Analytics, docs: NgApiDoc, content: ComponentApi) {
    this.analytics = analytics;
    // todo: inject docs
    this.docs = docs;

    this.headerAnchor = content.anchor;
    this.apiDocs = this.docs[content.title];
    this.configServiceName = `${content.title}Config`;
    const configApiDocs = this.docs[this.configServiceName];
    this.configProperties = {};
    if (configApiDocs) {
      this.apiDocs.inputs.forEach(
        (input: InputDesc) => (this.configProperties[input.name] = this.findInputConfigProperty(configApiDocs, input))
      );
    }
  }

  /**
   * Returns the default value of the given directive input by first looking for it in the matching config service
   * property. If there is no matching config property, it reads it from the input.
   */
  defaultInputValue(input: InputDesc): string | undefined {
    const configProperty = this.configProperties[input.name];

    return configProperty ? configProperty.defaultValue : input.defaultValue;
  }

  /**
   * Returns true if there is a config service property matching with the given directive input
   */
  hasConfigProperty(input: InputDesc): boolean {
    return !!this.configProperties[input.name];
  }

  methodSignature(method: MethodDesc): string {
    return signature(method);
  }

  trackSourceClick(): void {
    this.analytics.trackEvent('Source File View', this.apiDocs.className);
  }

  private findInputConfigProperty(configApiDocs: ClassDesc, input: InputDesc): PropertyDesc {
    return configApiDocs.properties.filter((prop: PropertyDesc) => prop.name === input.name)[0];
  }
}
