import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { SharedModule } from '../../shared';

import { CarouselSectionComponent } from './carousel-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-carousel.routes';

@NgModule({
  declarations:[
    CarouselSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports:[
    CarouselModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [CarouselSectionComponent]
})
export class DemoCarouselModule {
}
