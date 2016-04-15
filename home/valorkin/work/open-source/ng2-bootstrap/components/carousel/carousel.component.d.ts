import { OnDestroy } from 'angular2/core';
import { Slide } from './slide.component';
export declare enum Direction {
    UNKNOWN = 0,
    NEXT = 1,
    PREV = 2,
}
export declare class Carousel implements OnDestroy {
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
    select(nextSlide: Slide, direction?: Direction): void;
    play(): void;
    pause(): void;
    next(): any;
    prev(): any;
    addSlide(slide: Slide): void;
    removeSlide(slide: Slide): void;
    private goNext(slide, direction);
    private getSlideByIndex(index);
    private getCurrentIndex();
    private restartTimer();
    private resetTimer();
}
