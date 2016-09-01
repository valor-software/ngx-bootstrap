import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarouselComponent } from './carousel.component';
import { SlideComponent } from './slide.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SlideComponent, CarouselComponent],
  exports: [SlideComponent, CarouselComponent]
})
export class CarouselModule {
}
