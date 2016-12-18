import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ng2-bootstrap';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { AlertsSectionComponent } from './alerts-section.component';
import { DEMO_COMPONENTS } from './demos';
import { SharedModule } from '../../shared';
import { NgApiDocModule } from '../../api-docs';

@NgModule({
  declarations: [
    AlertsSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    AlertModule.forRoot(),
    NgApiDocModule,
    Ng2PageScrollModule,
    CommonModule,
    SharedModule
  ],
  exports: [AlertsSectionComponent]
})
export class DemoAlertsModule {
}
