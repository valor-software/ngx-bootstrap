export * from './modal/modal-backdrop.component';
export * from './modal/modal-options.class';
export * from './modal/modal.component';
export { ModalModule } from './modal/modal.module';

import { ModalBackdropComponent } from './modal/modal-backdrop.component';
import { ModalDirective } from './modal/modal.component';

/** @deprecated */
export const MODAL_DIRECTIVES = [
  ModalDirective, ModalBackdropComponent
];
