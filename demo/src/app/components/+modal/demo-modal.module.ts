import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../shared';
import { ModalSectionComponent } from './modal-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-modal.routes';

@NgModule({
  declarations: [
    ModalSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [ModalSectionComponent]
})
export class DemoModalModule {

}
