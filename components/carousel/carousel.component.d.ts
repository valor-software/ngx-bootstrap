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
    private goNext(slide, direction);
    private getSlideByIndex(index);
    private getCurrentIndex();
    private next();
    private prev();
    private restartTimer();
    private resetTimer();
    play(): void;
    pause(): void;
    addSlide(slide: Slide): void;
    removeSlide(slide: Slide): void;
}
