import { OnInit, OnDestroy } from 'angular2/core';
import { Carousel, Direction } from './carousel.component';
export declare class Slide implements OnInit, OnDestroy {
    index: number;
    direction: Direction;
    active: boolean;
    addClass: boolean;
    private carousel;
    constructor(carousel: Carousel);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
