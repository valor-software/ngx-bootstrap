import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { DocsModule } from '../../docs';

import { CarouselSectionComponent } from './carousel-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-carousel.routes';

@NgModule({
  declarations: [
    CarouselSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CarouselModule.forRoot(),
    CommonModule,
    FormsModule,
    DocsModule,
    RouterModule.forChild(routes)
  ],
  exports: [CarouselSectionComponent],
  entryComponents: [...DEMO_COMPONENTS]
})
export class DemoCarouselModule {}
