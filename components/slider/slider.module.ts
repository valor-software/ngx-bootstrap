import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SliderBarComponent } from './bar.component';
import { SliderDirective } from './slider.directive';
import { SliderComponent } from './slider.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SliderDirective, SliderBarComponent, SliderComponent],
  exports: [SliderDirective, SliderBarComponent, SliderComponent]
})
export class SliderModule {
}
