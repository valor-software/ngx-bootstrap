import { ModuleWithProviders, NgModule } from '@angular/core';

import { CarouselComponent } from './carousel.component';
import { SlideComponent } from './slide.component';

@NgModule({
    imports: [SlideComponent, CarouselComponent],
    exports: [SlideComponent, CarouselComponent]
})
export class CarouselModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<CarouselModule> {
    return {
      ngModule: CarouselModule,
      providers: []
    };
  }
}
