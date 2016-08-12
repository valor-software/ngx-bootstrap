import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlideComponent} from './slide.component';
import {CarouselComponent} from './carousel.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SlideComponent, CarouselComponent],
    exports: [SlideComponent, CarouselComponent]
})
export class CarouselModule {}
