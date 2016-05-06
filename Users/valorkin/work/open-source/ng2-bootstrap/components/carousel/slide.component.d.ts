import { OnInit, OnDestroy } from '@angular/core';
import { CarouselComponent, Direction } from './carousel.component';
export declare class SlideComponent implements OnInit, OnDestroy {
    index: number;
    direction: Direction;
    active: boolean;
    addClass: boolean;
    private carousel;
    constructor(carousel: CarouselComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
