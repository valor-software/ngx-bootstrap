import { NgModule, ModuleWithProviders } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

import { PositioningService } from 'ngx-bootstrap/positioning';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';

import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalDirective } from './modal.directive';
import { ModalContainerComponent } from './modal-container.component';
import { BsModalService } from './bs-modal.service';


@NgModule({
  imports: [A11yModule],
  declarations: [
    ModalBackdropComponent,
    ModalDirective,
    ModalContainerComponent
  ],
  exports: [ModalBackdropComponent, ModalDirective],
  entryComponents: [ModalBackdropComponent, ModalContainerComponent]
})
export class ModalModule {
  static forRoot(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [BsModalService, ComponentLoaderFactory, PositioningService]
    };
  }
  static forChild(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [BsModalService, ComponentLoaderFactory, PositioningService]
    };
  }
}
