// todo: add animate

import { Component, Input, OnDestroy } from '@angular/core';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../ng2-bootstrap-config';
import { SlideComponent } from './slide.component';

export enum Direction {UNKNOWN, NEXT, PREV}

// todo:
// (ng-swipe-right)="prev()" (ng-swipe-left)="next()"
@Component({
  selector: 'carousel',
  template: `
    <div (mouseenter)="pause()" (mouseleave)="play()" class="carousel slide">
      <ol class="carousel-indicators" *ngIf="slides.length > 1">
         <li *ngFor="let slidez of slides" [class.active]="slidez.active === true" (click)="select(slidez)"></li>
      </ol>
      <div class="carousel-inner"><ng-content></ng-content></div>
      <a class="left carousel-control" (click)="prev()" *ngIf="slides.length && currentSlide?.hasPreviousSibling">
        <span class="icon-prev" aria-hidden="true"></span>
        <span *ngIf="isBS4" class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" (click)="next()" *ngIf="slides.length && currentSlide?.hasNextSibling">
        <span class="icon-next" aria-hidden="true"></span>
        <span *ngIf="isBS4" class="sr-only">Next</span>
      </a>
    </div>
  `
})
export class CarouselComponent implements OnDestroy {
  @Input() public noWrap: boolean;
  @Input() public noPause: boolean;
  @Input() public noTransition: boolean;

  @Input()
  public get interval(): number {
    return this._interval;
  }

  public set interval(value: number) {
    this._interval = value;
    this.restartTimer();
  }

  public slides: Array<SlideComponent> = [];
  private currentInterval: any;
  private isPlaying: boolean;
  private destroyed: boolean = false;
  private currentSlide: SlideComponent;
  private _interval: number = 5000;
  private _lastAddedSlide: SlideComponent;

  public get isBS4(): boolean {
    return Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS4;
  }

  public ngOnDestroy(): void {
    this.destroyed = true;
  }

  public select(nextSlide: SlideComponent): void {
    let nextIndex = nextSlide.index;
    let direction =
      nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;

    // Prevent this user-triggered transition from occurring if there is
    // already one in progress
    if (nextSlide && nextSlide !== this.currentSlide) {
      this.goNext(nextSlide, direction);
    }
  }

  public play(): void {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.restartTimer();
    }
  }

  public pause(): void {
    if (!this.noPause) {
      this.isPlaying = false;
      this.resetTimer();
    }
  }

  public next(): any {
    let newIndex = (this.getCurrentIndex() + 1) % this.slides.length;

    if (newIndex === 0 && this.noWrap) {
      this.pause();
      return;
    }

    return this.select(this.getSlideByIndex(newIndex),);
  }

  public prev(): any {
    let newIndex = this.getCurrentIndex() - 1 < 0
      ? this.slides.length - 1
      : this.getCurrentIndex() - 1;

    if (this.noWrap && newIndex === this.slides.length - 1) {
      this.pause();
      return;
    }

    return this.select(this.getSlideByIndex(newIndex));
  }

  public addSlide(slide: SlideComponent): void {
    slide.index = this.slides.length;
    this.slides.push(slide);

    if (this.slides.length === 1 || slide.active) {
      this.select(slide);
      this.play();
    }
    slide.previousSiblingSlide = this._lastAddedSlide;
    if (this._lastAddedSlide) {
      this._lastAddedSlide.nextSiblingSlide = slide;
    }
    this._lastAddedSlide = slide;
  }

  public removeSlide(slide: SlideComponent): void {
    this.slides.splice(slide.index, 1);

    if (this.slides.length === 0) {
      this.currentSlide = void 0;
      return;
    }

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].index = i;
    }
  }

  private goNext(slide: SlideComponent, direction: Direction): void {
    if (this.destroyed) {
      return;
    }

    slide.direction = direction;
    slide.active = true;
    this.currentSlide = slide;

    // every time you change slides, reset the timer
    this.restartTimer();
  }

  private getSlideByIndex(index: number): any {
    let len = this.slides.length;
    for (let i = 0; i < len; ++i) {
      if (this.slides[i].index === index) {
        return this.slides[i];
      }
    }
    return void 0;
  }

  private getCurrentIndex(): number {
    return !this.currentSlide ? 0 : this.currentSlide.index;
  }

  private restartTimer(): any {
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

  private resetTimer(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = void 0;
    }
  }
}
