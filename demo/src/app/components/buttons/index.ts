import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { ButtonsSectionComponent } from './buttons-section.component';
import { ButtonsDemoComponent } from './demos/buttons-demo.component';
import { ButtonsModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    ButtonsSectionComponent,
    ButtonsDemoComponent
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
