/***
 * pause (not yet supported) (?string='hover') - event group name which pauses the cycling of the carousel, if hover pauses on mouseenter and resumes on mouseleave
 keyboard (not yet supported) (?boolean=true) - if false carousel will not react to keyboard events
 note: swiping not yet supported
 */
/****
 * Problems:
 * 1) if we set an active slide via model changes, .active class remains on a current slide.
 * 2) if we have only one slide, we shouldn't show prev/next nav buttons
 * 3) if first or last slide is active and noWrap is true, there should be "disabled" class on the nav buttons.
 * 4) default interval should be equal 5000
 */
import { OnDestroy, EventEmitter } from '@angular/core';
import { SlideComponent } from './slide.component';
import { CarouselConfig } from './carousel.config';
import LinkedList from './../utils/linked-list.class';
export declare enum Direction {
    UNKNOWN = 0,
    NEXT = 1,
    PREV = 2,
}
/**
 * Base element to create carousel
 */
export declare class CarouselComponent implements OnDestroy {
    /** If `true` — carousel will not cycle continuously and will have hard stops (prevent looping) */
    noWrap: boolean;
    /**  If `true` — will disable pausing on carousel mouse hover */
    noPause: boolean;
    protected _currentActiveSlide: number;
    /** Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property */
    activeSlideChange: EventEmitter<any>;
    /** Index of currently displayed slide(started for 0) */
    activeSlide: number;
    protected _interval: number;
    /**
     * Delay of item cycling in milliseconds. If false, carousel won't cycle automatically.
     */
    interval: number;
    protected _slides: LinkedList<SlideComponent>;
    readonly slides: SlideComponent[];
    protected currentInterval: any;
    protected isPlaying: boolean;
    protected destroyed: boolean;
    readonly isBs4: boolean;
    constructor(config: CarouselConfig);
    ngOnDestroy(): void;
    /**
     * Adds new slide. If this slide is first in collection - set it as active and starts auto changing
     * @param slide
     */
    addSlide(slide: SlideComponent): void;
    /**
     * Removes specified slide. If this slide is active - will roll to another slide
     * @param slide
     */
    removeSlide(slide: SlideComponent): void;
    /**
     * Rolling to next slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    nextSlide(force?: boolean): void;
    /**
     * Rolling to previous slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    previousSlide(force?: boolean): void;
    /**
     * Rolling to specified slide
     * @param index: {number} index of slide, which must be shown
     */
    selectSlide(index: number): void;
    /**
     * Starts a auto changing of slides
     */
    play(): void;
    /**
     * Stops a auto changing of slides
     */
    pause(): void;
    /**
     * Finds and returns index of currently displayed slide
     * @returns {number}
     */
    getCurrentSlideIndex(): number;
    /**
     * Defines, whether the specified index is last in collection
     * @param index
     * @returns {boolean}
     */
    isLast(index: number): boolean;
    /**
     * Defines next slide index, depending of direction
     * @param direction: Direction(UNKNOWN|PREV|NEXT)
     * @param force: {boolean} if TRUE - will ignore noWrap flag, else will return undefined if next slide require wrapping
     * @returns {any}
     */
    private findNextSlideIndex(direction, force);
    /**
     * Sets a slide, which specified through index, as active
     * @param index
     * @private
     */
    private _select(index);
    /**
     * Starts loop of auto changing of slides
     */
    private restartTimer();
    /**
     * Stops loop of auto changing of slides
     */
    private resetTimer();
}
