import { NgModule, ModuleWithProviders } from '@angular/core';

import { PositioningService } from 'ngx-bootstrap/positioning';
import { ComponentLoaderFactory, BackdropService } from 'ngx-bootstrap/component-loader';
import { FocusTrapModule } from 'ngx-bootstrap/focus-trap';

import { ModalDirective } from './modal.directive';
import { ModalContainerComponent } from './modal-container.component';
import { BsModalService } from './bs-modal.service';

export const focusTrapModule = FocusTrapModule.forRoot();

@NgModule({
  imports: [FocusTrapModule],
  declarations: [
    ModalDirective,
    ModalContainerComponent
  ],
  exports: [ModalDirective],
  entryComponents: [ModalContainerComponent],
  providers: [BackdropService]
})
export class ModalModule {
  static forRoot(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [BsModalService, ComponentLoaderFactory, PositioningService, BackdropService]
    };
  }
  static forChild(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [BsModalService, ComponentLoaderFactory, PositioningService, BackdropService]
    };
  }
}
