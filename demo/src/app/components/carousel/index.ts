import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';

import { CarouselDemoComponent } from './demos/carousel-demo.component';
import { CarouselSectionComponent } from './carousel-section.component';
import { NgApiDocModule } from '../../api-docs';
import { CarouselModule } from 'ng2-bootstrap';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

@NgModule({
  declarations:[
    CarouselDemoComponent,
    CarouselSectionComponent
  ],
  imports:[
    CarouselModule.forRoot(),
    NgApiDocModule,
    Ng2PageScrollModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [CarouselSectionComponent]
})
export class DemoCarouselModule {
}
