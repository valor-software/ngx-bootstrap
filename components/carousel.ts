import { CarouselComponent } from './carousel/carousel.component';
import { SlideComponent } from './carousel/slide.component';

export { CarouselComponent } from './carousel/carousel.component';
export { CarouselModule } from './carousel/carousel.module';
export { SlideComponent } from './carousel/slide.component';

/** @deprecated */
export const CAROUSEL_DIRECTIVES:Array<any> = [CarouselComponent, SlideComponent];
