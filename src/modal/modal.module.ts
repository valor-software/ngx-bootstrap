import { ModuleWithProviders, NgModule } from '@angular/core';

import { FocusTrapModule } from 'ngx-bootstrap/focus-trap';

import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalDirective } from './modal.directive';
import { ModalContainerComponent } from './modal-container.component';
import { BsModalService } from './bs-modal.service';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

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
  static forRoot(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [BsModalService, ComponentLoaderFactory, PositioningService]
    };
  }

  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forChild(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [BsModalService, ComponentLoaderFactory, PositioningService]
    };
  }
}
