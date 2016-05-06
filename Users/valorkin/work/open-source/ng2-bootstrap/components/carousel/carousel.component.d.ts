import { OnDestroy } from '@angular/core';
import { SlideComponent } from './slide.component';
export declare enum Direction {
    UNKNOWN = 0,
    NEXT = 1,
    PREV = 2,
}
export declare class CarouselComponent implements OnDestroy {
    noWrap: boolean;
    noPause: boolean;
    noTransition: boolean;
    interval: number;
    private slides;
    private currentInterval;
    private isPlaying;
    private destroyed;
    private currentSlide;
    private _interval;
    ngOnDestroy(): void;
    select(nextSlide: SlideComponent, direction?: Direction): void;
    play(): void;
    pause(): void;
    next(): any;
    prev(): any;
    addSlide(slide: SlideComponent): void;
    removeSlide(slide: SlideComponent): void;
    private goNext(slide, direction);
    private getSlideByIndex(index);
    private getCurrentIndex();
    private restartTimer();
    private resetTimer();
}
