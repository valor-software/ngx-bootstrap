import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BarComponent } from './bar.component';
import { ProgressDirective } from './progress.directive';
import { ProgressbarComponent } from './progressbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProgressDirective, BarComponent, ProgressbarComponent],
  exports: [ProgressDirective, BarComponent, ProgressbarComponent]
})
export class ProgressbarModule {
}
