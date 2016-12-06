/**
 * @author ng-team
 * @copyright ng-bootstrap
 */
import { NgModule } from '@angular/core';

import { Analytics } from './analytics/analytics';
import { ExampleBoxComponent } from './example-box/example-box.component';
import { NgApiDocComponent } from './api-doc/api-doc.component';
import { NgApiDocClassComponent } from './api-doc-class/api-doc-class.component';
import { NgApiDocConfigComponent } from './api-doc-config/api-doc-config.component';

export { NgApiDoc } from './api-docs.model';
export { Analytics } from './analytics/analytics';
export { ExampleBoxComponent } from './example-box/example-box.component';
export { NgApiDocComponent } from './api-doc/api-doc.component';
export { NgApiDocClassComponent } from './api-doc-class/api-doc-class.component';
export { NgApiDocConfigComponent } from './api-doc-config/api-doc-config.component';

@NgModule({
  declarations: [ExampleBoxComponent, NgApiDocComponent, NgApiDocClassComponent, NgApiDocConfigComponent],
  exports: [ExampleBoxComponent, NgApiDocComponent, NgApiDocClassComponent, NgApiDocConfigComponent],
  provide: [Analytics]
})
export class NgApiDocModule {
}
