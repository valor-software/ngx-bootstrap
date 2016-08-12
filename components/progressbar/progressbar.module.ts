import {NgModule} from '@angular/core';
import {ProgressDirective} from './progress.directive';
import {BarComponent} from './bar.component';
import {ProgressbarComponent} from './progressbar.component';

@NgModule({
    declarations: [ProgressDirective, BarComponent, ProgressbarComponent],
    exports: [ProgressDirective, BarComponent, ProgressbarComponent]
})
export class ProgressbarModule {}
