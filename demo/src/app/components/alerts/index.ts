import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ng2-bootstrap';
import { AlertsSectionComponent } from './alerts-section.component';
import { DEMO_COMPONENTS } from './demos';
import { SharedModule } from '../../shared';

@NgModule({
  declarations: [
    AlertsSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    AlertModule.forRoot(),
    CommonModule,
    SharedModule
  ],
  exports: [AlertsSectionComponent]
})
export class DemoAlertsModule {
}
