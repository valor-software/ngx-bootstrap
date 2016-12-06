/**
 * @author ng-team
 * @copyright ng-bootstrap
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Analytics } from './analytics/analytics';
import { NgApiDocComponent } from './api-doc/api-doc.component';
import { NgApiDocClassComponent } from './api-doc-class/api-doc-class.component';
import { NgApiDocConfigComponent } from './api-doc-config/api-doc-config.component';

export { NgApiDoc } from './api-docs.model';
export { Analytics } from './analytics/analytics';
export { NgApiDocComponent } from './api-doc/api-doc.component';
export { NgApiDocClassComponent } from './api-doc-class/api-doc-class.component';
export { NgApiDocConfigComponent } from './api-doc-config/api-doc-config.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NgApiDocComponent, NgApiDocClassComponent, NgApiDocConfigComponent],
  exports: [NgApiDocComponent, NgApiDocClassComponent, NgApiDocConfigComponent],
  providers: [Analytics]
})
export class NgApiDocModule {
}
