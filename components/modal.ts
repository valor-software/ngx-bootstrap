export * from './modal/modal-backdrop.component';
export * from './modal/modal-options.class';
export * from './modal/modal.component';

import {ModalBackdropComponent} from './modal/modal-backdrop.component';
import {ModalComponent} from './modal/modal.component';

export const MODAL_DIRECTVES = [
  ModalComponent, ModalBackdropComponent
];
