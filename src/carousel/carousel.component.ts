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

import { Component, Input, OnDestroy } from '@angular/core';

import { isBs3 } from '../utils/ng2-bootstrap-config';
import { SlideComponent } from './slide.component';

export enum Direction {UNKNOWN, NEXT, PREV}

/**
 * Base element to create carousel
 */
@Component({
  selector: 'carousel',
  template: `
    <div (mouseenter)="pause()" (mouseleave)="play()" class="carousel slide">
      <ol class="carousel-indicators" *ngIf="slides.length > 1">
         <li *ngFor="let slidez of slides" [class.active]="slidez.active === true" (click)="select(slidez)"></li>
      </ol>
      <div class="carousel-inner"><ng-content></ng-content></div>
      <a class="left carousel-control" (click)="prev()" *ngIf="slides.length">
        <span class="icon-prev" aria-hidden="true"></span>
        <span *ngIf="isBs4" class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" (click)="next()" *ngIf="slides.length">
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
  /** if `true` will disable transitions on the carousel */
  @Input() public noTransition:boolean;

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

  public slides:SlideComponent[] = [];
  protected currentInterval:any;
  protected isPlaying:boolean;
  protected destroyed:boolean = false;
  protected currentSlide:SlideComponent;
  protected _interval:number;

  public get isBs4():boolean {
    return !isBs3();
  }

  public ngOnDestroy():void {
    this.destroyed = true;
  }

  public select(nextSlide:SlideComponent, direction:Direction = Direction.UNKNOWN):void {
    let nextIndex = nextSlide.index;
    if (direction === Direction.UNKNOWN) {
      direction = nextIndex > this.getCurrentIndex()
        ? Direction.NEXT
        : Direction.PREV;
    }

    // Prevent this user-triggered transition from occurring if there is
    // already one in progress
    if (nextSlide && nextSlide !== this.currentSlide) {
      this.goNext(nextSlide, direction);
    }
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

  public next():any {
    let newIndex = (this.getCurrentIndex() + 1) % this.slides.length;

    if (newIndex === 0 && this.noWrap) {
      this.pause();
      return;
    }

    return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
  }

  public prev():any {
    let newIndex = this.getCurrentIndex() - 1 < 0
      ? this.slides.length - 1
      : this.getCurrentIndex() - 1;

    if (this.noWrap && newIndex === this.slides.length - 1) {
      this.pause();
      return;
    }

    return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
  }

  public addSlide(slide:SlideComponent):void {
    slide.index = this.slides.length;
    this.slides.push(slide);
    if (this.slides.length === 1 || slide.active) {
      this.select(this.slides[this.slides.length - 1]);
      if (this.slides.length === 1) {
        this.play();
      }
    } else {
      slide.active = false;
    }
  }

  public removeSlide(slide:SlideComponent):void {
    this.slides.splice(slide.index, 1);

    if (this.slides.length === 0) {
      this.currentSlide = void 0;
      return;
    }

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].index = i;
    }
  }

  protected goNext(slide:SlideComponent, direction:Direction):void {
    if (this.destroyed) {
      return;
    }

    slide.direction = direction;
    slide.active = true;

    if (this.currentSlide) {
      this.currentSlide.direction = direction;
      this.currentSlide.active = false;
    }

    this.currentSlide = slide;

    // every time you change slides, reset the timer
    this.restartTimer();
  }

  protected getSlideByIndex(index:number):any {
    let len = this.slides.length;
    for (let i = 0; i < len; ++i) {
      if (this.slides[i].index === index) {
        return this.slides[i];
      }
    }
    return void 0;
  }

  protected getCurrentIndex():number {
    return !this.currentSlide ? 0 : this.currentSlide.index;
  }

  protected restartTimer():any {
    this.resetTimer();
    let interval = +this.interval;
    if (!isNaN(interval) && interval > 0) {
      this.currentInterval = setInterval(
        () => {
          let nInterval = +this.interval;
          if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length) {
            this.next();
          } else {
            this.pause();
          }
        },
        interval);
    }
  }

  protected resetTimer():void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = void 0;
    }
  }
}
