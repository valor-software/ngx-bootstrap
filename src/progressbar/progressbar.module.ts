import { NgModule } from '@angular/core';

import { BarComponent } from './bar.component';
import { ProgressbarComponent } from './progressbar.component';

@NgModule({
    imports: [BarComponent, ProgressbarComponent],
    exports: [BarComponent, ProgressbarComponent]
})
export class ProgressbarModule {}
