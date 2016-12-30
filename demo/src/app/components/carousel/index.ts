import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';

import { CarouselSectionComponent } from './carousel-section.component';
import { CarouselModule } from 'ng2-bootstrap';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations:[
    CarouselSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports:[
    CarouselModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [CarouselSectionComponent]
})
export class DemoCarouselModule {
}
