import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FocusTrapDirective } from './focus-trap';

@NgModule({
    imports: [CommonModule, FocusTrapDirective],
    exports: [FocusTrapDirective]
})
export class FocusTrapModule {
}
