/**
 * @author ng-team
 * @copyright ng-bootstrap
 */
// todo: add configuration of base url for source code
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage.component';

export { UsageComponent } from './usage.component';

@NgModule({
  declarations: [
    UsageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsageComponent
  ],
  providers: []
})
export class UsageComponentModule {}
