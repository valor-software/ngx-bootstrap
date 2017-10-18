/**
 * @author ng-team
 * @copyright ng-bootstrap
 */
// todo: add configuration of base url for source code
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoTopSectionComponent } from './demo-top-section.component';

export { DemoTopSectionComponent } from './demo-top-section.component';

@NgModule({
  declarations: [
    DemoTopSectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DemoTopSectionComponent
  ],
  providers: []
})
export class DemoTopSectionComponentModule {}
