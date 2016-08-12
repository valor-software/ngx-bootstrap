import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressDirective} from './progress.directive';
import {BarComponent} from './bar.component';
import {ProgressbarComponent} from './progressbar.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ProgressDirective, BarComponent, ProgressbarComponent],
    exports: [ProgressDirective, BarComponent, ProgressbarComponent]
})
export class ProgressbarModule {}
