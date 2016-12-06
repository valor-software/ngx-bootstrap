import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { AlertsSectionComponent } from './alerts-section.component';
import { AlertsDemoComponent } from './demos/alerts-demo.component';
import { AlertModule } from 'ng2-bootstrap';
import { NgApiDocModule } from '../../api-docs';

@NgModule({
  declarations: [
    AlertsSectionComponent,
    AlertsDemoComponent
  ],
  imports: [
    AlertModule,
    NgApiDocModule,
    CommonModule,
    SharedModule
  ],
  exports: [AlertsSectionComponent]
})
export class DemoAlertsModule {
}
