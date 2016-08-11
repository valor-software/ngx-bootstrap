import {SlideComponent} from './carousel/slide.component';
import {CarouselComponent} from './carousel/carousel.component';

export {SlideComponent} from './carousel/slide.component';
export {CarouselComponent} from './carousel/carousel.component';
export {CarouselModule} from './carousel/carousel.module';

/** @deprecated */
export const CAROUSEL_DIRECTIVES:Array<any> = [CarouselComponent, SlideComponent];
