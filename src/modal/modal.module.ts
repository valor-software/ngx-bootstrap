import { NgModule, ModuleWithProviders } from '@angular/core';

import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalDirective } from './modal.component';
import { PositioningService } from '../positioning';
import { ComponentLoaderFactory } from '../component-loader';
import { ModalContainerComponent } from './modal-container.component';
import { BsModalService } from './bs-modal.service';

@NgModule({
  declarations: [ModalBackdropComponent, ModalDirective, ModalContainerComponent],
  exports: [ModalBackdropComponent, ModalDirective],
  providers: [BsModalService, ComponentLoaderFactory],
  entryComponents: [ModalBackdropComponent, ModalContainerComponent]
})
export class ModalModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: ModalModule, providers: [ComponentLoaderFactory, PositioningService]};
  }
}
