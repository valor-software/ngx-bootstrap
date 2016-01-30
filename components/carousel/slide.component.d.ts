import { OnInit, OnDestroy } from 'angular2/core';
import { Carousel, Direction } from './carousel.component';
export declare class Slide implements OnInit, OnDestroy {
    private carousel;
    index: number;
    direction: Direction;
    active: boolean;
    private addClass;
    constructor(carousel: Carousel);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
