import {NgModule} from '@angular/core';

import {ModalBackdropComponent} from './modal-backdrop.component';
import {ModalDirective} from './modal.component';

@NgModule({
    declarations: [ModalBackdropComponent, ModalDirective],
    exports: [ModalBackdropComponent, ModalDirective]
})
export class ModalModule {}
