import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { ButtonsSectionComponent } from './buttons-section.component';
import { ButtonsModule } from 'ng2-bootstrap';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    ButtonsSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    ButtonsModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [ButtonsSectionComponent]
})
export class DemoButtonsModule {
}
