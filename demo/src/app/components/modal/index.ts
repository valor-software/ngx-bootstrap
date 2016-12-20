import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { ModalModule } from 'ng2-bootstrap';
import { ModalDemoComponent } from './demos/modal-demo.component';
import { ModalSectionComponent } from './modal-section.component';
import { NgApiDocModule } from '../../api-docs';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

@NgModule({
  declarations: [
    ModalDemoComponent,
    ModalSectionComponent
  ],
  imports: [
    ModalModule.forRoot(),
    NgApiDocModule,
    Ng2PageScrollModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [ModalDemoComponent]
})
export class DemoModalModule {

}
