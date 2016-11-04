import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { AlertsSectionComponent } from './alerts-section.component';
import { AlertsDemoComponent } from './demos/alerts-demo.component';
import { AlertModule } from '../../../../dist/components/alert/alert.module';

@NgModule({
  declarations: [
    AlertsSectionComponent,
    AlertsDemoComponent
  ],
  imports: [
    AlertModule,
    CommonModule,
    SharedModule
  ],
  exports: [AlertsSectionComponent]
})
export class AlertsDocModule {
}
