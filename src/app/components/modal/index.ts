import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { ModalModule } from '../../../../dist/components/modal/modal.module';
import { ModalDemoComponent } from './demos/modal-demo.component';
import { ModalSectionComponent } from './modal-section.component';

@NgModule({
  declarations: [
    ModalDemoComponent,
    ModalSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ModalModule
  ],
  exports: [ModalDemoComponent]
})
export class ModalDocModule {

}
