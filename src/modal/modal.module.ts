import { NgModule } from '@angular/core';

import { FocusTrapModule } from 'ngx-bootstrap/focus-trap';

import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalDirective } from './modal.directive';
import { ModalContainerComponent } from './modal-container.component';

@NgModule({
    imports: [
      FocusTrapModule,
      ModalBackdropComponent,
      ModalDirective,
      ModalContainerComponent
    ],
    exports: [ModalBackdropComponent, ModalDirective]
})
export class ModalModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return ModalModule;
  }
}
