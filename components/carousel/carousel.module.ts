import {NgModule} from '@angular/core';
import {SlideComponent} from './slide.component';
import {CarouselComponent} from './carousel.component';

@NgModule({
    declarations: [SlideComponent, CarouselComponent],
    exports: [SlideComponent, CarouselComponent]
})
export class CarouselModule {}
