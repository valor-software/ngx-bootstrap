// todo: add animation

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

import { Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

import { isBs3 } from '../utils/ng2-bootstrap-config';
import { SlideComponent } from './slide.component';
import { CarouselConfig } from './carousel.config';

import LinkedList from './../utils/linked-list.class';

export enum Direction {UNKNOWN, NEXT, PREV}

/**
 * Base element to create carousel
 */
@Component({
  selector: 'carousel',
  template: `
    <div (mouseenter)="pause()" (mouseleave)="play()" class="carousel slide">
      <ol class="carousel-indicators" *ngIf="slides.length > 1">
         <li *ngFor="let slidez of slides; let i = index;" [class.active]="slidez.active === true" (click)="selectSlide(i)"></li>
      </ol>
      <div class="carousel-inner"><ng-content></ng-content></div>
      <a class="left carousel-control" [class.disabled]="getCurrentSlideIndex() === 0 && noWrap" (click)="previousSlide()" *ngIf="slides.length > 1">
        <span class="icon-prev" aria-hidden="true"></span>
        <span *ngIf="isBs4" class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" (click)="nextSlide()"  [class.disabled]="isLast(getCurrentSlideIndex()) && noWrap" *ngIf="slides.length > 1">
        <span class="icon-next" aria-hidden="true"></span>
        <span *ngIf="isBs4" class="sr-only">Next</span>
      </a>
    </div>
  `
})
export class CarouselComponent implements OnDestroy {
  /** if `true` carousel will not cycle continuously and will have hard stops (prevent looping) */
  @Input() public noWrap:boolean;
  /**  if `true` will disable pausing on carousel mouse hover */
  @Input() public noPause:boolean;

  /**
   * Amount of time in milliseconds to delay between automatically
   * cycling an item. If false, carousel will not automatically cycle
   */
  @Input()
  public get interval():number {
    return this._interval;
  }
  public set interval(value:number) {
    this._interval = value;
    this.restartTimer();
  }

  @Output() public activeSlideChanged: EventEmitter <any> = new EventEmitter<any>(false);

  protected _slides: LinkedList<SlideComponent> = new LinkedList<SlideComponent>();
  public get slides(): SlideComponent[] {
    return this._slides.toArray();
  }

  protected currentInterval:any;
  protected isPlaying:boolean;
  protected destroyed:boolean = false;
  protected _interval:number;

  public get isBs4():boolean {
    return !isBs3();
  }

  public constructor(config: CarouselConfig) {
    Object.assign(this, config);
  }

  public ngOnDestroy():void {
    this.destroyed = true;
  }

  public addSlide(slide: SlideComponent): void {
    this._slides.add(slide);
    if (this._slides.length === 1) {
      slide.active = true;
      this.play();
    }
  }

  public removeSlide(slide: SlideComponent): void {
    const remIndex = this._slides.indexOf(slide);

    if (this.getCurrentSlideIndex() === remIndex) {

      // behavior in case removing of a current active slide
      if (this._slides.length > 1) {
        if (this.isLast(remIndex) && this.noWrap) {

          // last slide and looping is disabled - step backward
          this._select(Direction.PREV, undefined, true);
        } else {
          this._select(Direction.NEXT, undefined, true);
        }
      }
    }

    this._slides.remove(remIndex);
    this.activeSlideChanged.emit(this.getCurrentSlideIndex());
  }

  public nextSlide(): void {
    this._select(Direction.NEXT);
  }

  public previousSlide(): void {
    this._select(Direction.PREV);
  }

  public selectSlide(index: number): void {
    this._select(undefined, index, true);
  }

  public play():void {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.restartTimer();
    }
  }

  public pause():void {
    if (!this.noPause) {
      this.isPlaying = false;
      this.resetTimer();
    }
  }

  public getCurrentSlideIndex(): number {
    return this._slides.findIndex((slide: SlideComponent) => slide.active);
  }

  public isLast(index: number): boolean {
    return index + 1 >= this._slides.length;
  }

  /**
   * Select slide
   * @param direction: {Direction}
   * @param nextIndex: {number}(optional) - index of next active slide
   * @param force: boolean {optional} - if true, selection will ignore this.noWrap flag(for jumping after removing a current slide)
   * @private
   */
  private _select(direction: Direction = 0, nextIndex?: number, force: boolean = false): void {
    const currentSlideIndex = this.getCurrentSlideIndex();

    // if this is last slide, need to going forward but looping is disabled
    if (!force && (this.isLast(currentSlideIndex) && direction && direction !== Direction.PREV && this.noWrap)) {
      this.pause();
      return;
    }

    let currentSlide = this._slides.get(currentSlideIndex);
    let nextSlideIndex: number = !isNaN(nextIndex) ? nextIndex : undefined;

    if (direction !== undefined && direction !== Direction.UNKNOWN) {
      switch (direction) {
        case Direction.NEXT:

          // if this is last slide, not force, looping is disabled and need to going forward - select current slide, as a next
          nextSlideIndex = (!this.isLast(currentSlideIndex)) ? currentSlideIndex + 1 :
            (!force && this.noWrap ) ? currentSlideIndex : 0;
          break;
        case Direction.PREV:

          // if this is first slide, not force, looping is disabled and need to going backward - select current slide, as a next
          nextSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 :
            (!force && this.noWrap ) ? currentSlideIndex : this._slides.length - 1;
          break;
        default:
          throw new Error('Wrong direction');
      }
    }

    if (nextSlideIndex === currentSlideIndex) {
      return;
    }

    let nextSlide = this._slides.get(nextSlideIndex);
    currentSlide.active = false;
    nextSlide.active = true;
    this.activeSlideChanged.emit(nextSlideIndex);

  }

  private restartTimer():any {
    this.resetTimer();
    let interval = +this.interval;
    if (!isNaN(interval) && interval > 0) {
      this.currentInterval = setInterval(
        () => {
          let nInterval = +this.interval;
          if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length) {
            this._select(Direction.NEXT);
          } else {
            this.pause();
          }
        },
        interval);
    }
  }

  private resetTimer():void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = void 0;
    }
  }
}
