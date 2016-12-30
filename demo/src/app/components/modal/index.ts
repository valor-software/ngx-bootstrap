import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { ModalModule } from 'ng2-bootstrap';
import { ModalSectionComponent } from './modal-section.component';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    ModalSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [ModalSectionComponent]
})
export class DemoModalModule {

}
