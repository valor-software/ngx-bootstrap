import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { AlertsSectionComponent } from './alerts-section.component';
import { AlertModule } from 'ng2-bootstrap';
import { NgApiDocModule } from '../../api-docs';
import { DEMO_COMPONENTS } from './demos/index';

@NgModule({
  declarations: [
    AlertsSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    AlertModule.forRoot(),
    NgApiDocModule,
    CommonModule,
    SharedModule
  ],
  exports: [AlertsSectionComponent]
})
export class DemoAlertsModule {
}
