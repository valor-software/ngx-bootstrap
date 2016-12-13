import { NgModule } from '@angular/core';

import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalDirective } from './modal.component';
import { PositioningService } from '../positioning';
import { ComponentLoaderFactory } from '../component-loader';

@NgModule({
  declarations: [ModalBackdropComponent, ModalDirective],
  exports: [ModalBackdropComponent, ModalDirective],
  entryComponents: [ModalBackdropComponent],
  providers: [ComponentLoaderFactory, PositioningService]
})
export class ModalModule {
}
