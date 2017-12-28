import { NgModule, ModuleWithProviders } from '@angular/core';

import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalDirective } from './modal.directive';
import { PositioningService } from '../positioning';
import { ComponentLoaderFactory } from '../component-loader';
import { ModalContainerComponent } from './modal-container.component';
import { BsModalService } from './bs-modal.service';
import { BsModalStore } from './bs-modal.store';

@NgModule({
  declarations: [
    ModalBackdropComponent,
    ModalDirective,
    ModalContainerComponent
  ],
  exports: [ModalBackdropComponent, ModalDirective],
  entryComponents: [ModalBackdropComponent, ModalContainerComponent],
  providers: [BsModalService, ComponentLoaderFactory]
})
export class ModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [BsModalStore, PositioningService]
    };
  }
}
