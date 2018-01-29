// tslint:disable:max-file-line-count
/***
 * pause (not yet supported) (?string='hover') - event group name which pauses
 * the cycling of the carousel, if hover pauses on mouseenter and resumes on
 * mouseleave keyboard (not yet supported) (?boolean=true) - if false
 * carousel will not react to keyboard events
 * note: swiping not yet supported
 */
/****
 * Problems:
 * 1) if we set an active slide via model changes, .active class remains on a
 * current slide.
 * 2) if we have only one slide, we shouldn't show prev/next nav buttons
 * 3) if first or last slide is active and noWrap is true, there should be
 * "disabled" class on the nav buttons.
 * 4) default interval should be equal 5000
 */

import {
  Component, EventEmitter, Input, NgZone, OnDestroy, Output
} from '@angular/core';

import { isBs3, LinkedList } from '../utils/index';
import { SlideComponent } from './slide.component';
import { CarouselConfig } from './carousel.config';

export enum Direction {
  UNKNOWN,
  NEXT,
  PREV
}

/**
 * Base element to create carousel
 */
@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnDestroy {
  /** If `true` — carousel will not cycle continuously and will have hard stops (prevent looping) */
  @Input() noWrap: boolean;
  /**  If `true` — will disable pausing on carousel mouse hover */
  @Input() noPause: boolean;
  /**  If `true` — carousel-indicators are visible  */
  @Input() showIndicators: boolean;

  /** Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property */
  @Output()
  activeSlideChange: EventEmitter<any> = new EventEmitter<any>(false);

  /** Index of currently displayed slide(started for 0) */
  @Input()
  set activeSlide(index: number) {
    if (this._slides.length && index !== this._currentActiveSlide) {
      this._select(index);
    }
  }

  get activeSlide(): number {
    return this._currentActiveSlide;
  }

  /**
   * Delay of item cycling in milliseconds. If false, carousel won't cycle
   * automatically.
   */
  @Input()
  get interval(): number {
    return this._interval;
  }

  set interval(value: number) {
    this._interval = value;
    this.restartTimer();
  }

  get slides(): SlideComponent[] {
    return this._slides.toArray();
  }

  protected _currentActiveSlide: number;
  protected _interval: number;
  protected _slides: LinkedList<SlideComponent> = new LinkedList<SlideComponent>();
  protected currentInterval: any;
  protected isPlaying: boolean;
  protected destroyed = false;

  get isBs4(): boolean {
    return !isBs3();
  }

  constructor(config: CarouselConfig, private ngZone: NgZone) {
    Object.assign(this, config);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  /**
   * Adds new slide. If this slide is first in collection - set it as active
   * and starts auto changing
   * @param slide
   */
  addSlide(slide: SlideComponent): void {
    this._slides.add(slide);
    if (this._slides.length === 1) {
      this._currentActiveSlide = void 0;
      this.activeSlide = 0;
      this.play();
    }
  }

  /**
   * Removes specified slide. If this slide is active - will roll to another
   * slide
   * @param slide
   */
  removeSlide(slide: SlideComponent): void {
    const remIndex = this._slides.indexOf(slide);

    if (this._currentActiveSlide === remIndex) {
      // removing of active slide
      let nextSlideIndex: number = void 0;
      if (this._slides.length > 1) {
        // if this slide last - will roll to first slide, if noWrap flag is
        // FALSE or to previous, if noWrap is TRUE in case, if this slide in
        // middle of collection, index of next slide is same to removed
        nextSlideIndex = !this.isLast(remIndex)
          ? remIndex
          : this.noWrap ? remIndex - 1 : 0;
      }
      this._slides.remove(remIndex);

      // prevents exception with changing some value after checking
      setTimeout(() => {
        this._select(nextSlideIndex);
      }, 0);
    } else {
      this._slides.remove(remIndex);
      const currentSlideIndex = this.getCurrentSlideIndex();
      setTimeout(() => {
        // after removing, need to actualize index of current active slide
        this._currentActiveSlide = currentSlideIndex;
        this.activeSlideChange.emit(this._currentActiveSlide);
      }, 0);
    }
  }

  /**
   * Rolling to next slide
   * @param force: {boolean} if true - will ignore noWrap flag
   */
  nextSlide(force = false): void {
    this.activeSlide = this.findNextSlideIndex(Direction.NEXT, force);
  }

  /**
   * Rolling to previous slide
   * @param force: {boolean} if true - will ignore noWrap flag
   */
  previousSlide(force = false): void {
    this.activeSlide = this.findNextSlideIndex(Direction.PREV, force);
  }

  /**
   * Rolling to specified slide
   * @param index: {number} index of slide, which must be shown
   */
  selectSlide(index: number): void {
    this.activeSlide = index;
  }

  /**
   * Starts a auto changing of slides
   */
  play(): void {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.restartTimer();
    }
  }

  /**
   * Stops a auto changing of slides
   */
  pause(): void {
    if (!this.noPause) {
      this.isPlaying = false;
      this.resetTimer();
    }
  }

  /**
   * Finds and returns index of currently displayed slide
   * @returns {number}
   */
  getCurrentSlideIndex(): number {
    return this._slides.findIndex((slide: SlideComponent) => slide.active);
  }

  /**
   * Defines, whether the specified index is last in collection
   * @param index
   * @returns {boolean}
   */
  isLast(index: number): boolean {
    return index + 1 >= this._slides.length;
  }

  /**
   * Defines next slide index, depending of direction
   * @param direction: Direction(UNKNOWN|PREV|NEXT)
   * @param force: {boolean} if TRUE - will ignore noWrap flag, else will
   *   return undefined if next slide require wrapping
   * @returns {any}
   */
  private findNextSlideIndex(direction: Direction, force: boolean): number {
    let nextSlideIndex = 0;

    if (
      !force &&
      (this.isLast(this.activeSlide) &&
        direction !== Direction.PREV &&
        this.noWrap)
    ) {
      return void 0;
    }

    switch (direction) {
      case Direction.NEXT:
        // if this is last slide, not force, looping is disabled
        // and need to going forward - select current slide, as a next
        nextSlideIndex = !this.isLast(this._currentActiveSlide)
          ? this._currentActiveSlide + 1
          : !force && this.noWrap ? this._currentActiveSlide : 0;
        break;
      case Direction.PREV:
        // if this is first slide, not force, looping is disabled
        // and need to going backward - select current slide, as a next
        nextSlideIndex =
          this._currentActiveSlide > 0
            ? this._currentActiveSlide - 1
            : !force && this.noWrap
            ? this._currentActiveSlide
            : this._slides.length - 1;
        break;
      default:
        throw new Error('Unknown direction');
    }

    return nextSlideIndex;
  }

  /**
   * Sets a slide, which specified through index, as active
   * @param index
   * @private
   */
  private _select(index: number): void {
    if (isNaN(index)) {
      this.pause();

      return;
    }
    const currentSlide = this._slides.get(this._currentActiveSlide);
    if (currentSlide) {
      currentSlide.active = false;
    }
    const nextSlide = this._slides.get(index);
    if (nextSlide) {
      this._currentActiveSlide = index;
      nextSlide.active = true;
      this.activeSlide = index;
      this.activeSlideChange.emit(index);
    }
  }

  /**
   * Starts loop of auto changing of slides
   */
  private restartTimer(): any {
    this.resetTimer();
    const interval = +this.interval;
    if (!isNaN(interval) && interval > 0) {
      this.currentInterval = this.ngZone.runOutsideAngular(() => {
        return setInterval(() => {
          const nInterval = +this.interval;
          this.ngZone.run(() => {
            if (
              this.isPlaying &&
              !isNaN(this.interval) &&
              nInterval > 0 &&
              this.slides.length
            ) {
              this.nextSlide();
            } else {
              this.pause();
            }
          });
        }, interval);
      });
    }
  }

  /**
   * Stops loop of auto changing of slides
   */
  private resetTimer(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = void 0;
    }
  }
}
