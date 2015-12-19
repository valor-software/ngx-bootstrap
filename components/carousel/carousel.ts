import {
  Component, Directive,
  OnInit, OnDestroy, Input, HostBinding,
  EventEmitter, ElementRef
} from 'angular2/core';
import { NgClass, NgFor } from 'angular2/common';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../ng2-bootstrap-config';

export enum Direction {UNKNOWN, NEXT, PREV}
// todo: add animate

const NAVIGATION:any = {
  [Ng2BootstrapTheme.BS4]: `
    <a class="left carousel-control" (click)="prev()" [hidden]="!slides.length">
      <span class="icon-prev" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" (click)="next()" [hidden]="!slides.length">
      <span class="icon-next" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  `,
  [Ng2BootstrapTheme.BS3]: `
    <a class="left carousel-control" (click)="prev()" [hidden]="!slides.length">
      <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a class="right carousel-control" (click)="next()" [hidden]="!slides.length">
      <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
  `
};

// todo:
// (ng-swipe-right)="prev()" (ng-swipe-left)="next()"
@Component({
  selector: 'carousel',
  directives: [NgClass, NgFor],
  template: `
    <div (mouseenter)="pause()" (mouseleave)="play()" class="carousel slide">
      <ol class="carousel-indicators" [hidden]="slides.length <= 1">
         <li *ngFor="#slidez of slides" [ngClass]="{active: slidez.active === true}" (click)="select(slidez)"></li>
      </ol>
      <div class="carousel-inner"><ng-content></ng-content></div>
      ${NAVIGATION[Ng2BootstrapConfig.theme]}
    </div>
  `
})
export class Carousel implements OnDestroy {
  @Input() private noWrap:boolean;
  @Input() private noPause:boolean;
  @Input() private noTransition:boolean;

  @Input() public get interval():number {
    return this._interval;
  }

  public set interval(value:number) {
    this._interval = value;
    this.restartTimer();
  }

  private slides:Array<Slide> = [];
  private currentInterval:any;
  private isPlaying:boolean;
  private destroyed:boolean = false;
  private currentSlide:Slide;
  private _interval:number;

  public ngOnDestroy() {
    this.destroyed = true;
  }

  public select(nextSlide:Slide, direction:Direction = Direction.UNKNOWN) {
    let nextIndex = nextSlide.index;
    if (direction === Direction.UNKNOWN) {
      direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
    }

    // Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide && nextSlide !== this.currentSlide) {
      this.goNext(nextSlide, direction);
    }
  }

  private goNext(slide:Slide, direction:Direction) {
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

  private getSlideByIndex(index:number) {
    let len = this.slides.length;
    for (let i = 0; i < len; ++i) {
      if (this.slides[i].index === index) {
        return this.slides[i];
      }
    }
  }

  private getCurrentIndex() {
    return !this.currentSlide ? 0 : this.currentSlide.index;
  }

  private next() {
    let newIndex = (this.getCurrentIndex() + 1) % this.slides.length;

    if (newIndex === 0 && this.noWrap) {
      this.pause();
      return;
    }

    return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
  }

  private prev() {
    let newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;

    if (this.noWrap && newIndex === this.slides.length - 1) {
      this.pause();
      return;
    }

    return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
  }

  private restartTimer() {
    this.resetTimer();
    let interval = +this.interval;
    if (!isNaN(interval) && interval > 0) {
      this.currentInterval = setInterval(() => {
        let nInterval = +this.interval;
        if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length) {
          this.next();
        } else {
          this.pause();
        }
      }, interval);
    }
  }

  private resetTimer() {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
  }

  public play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.restartTimer();
    }
  }

  public pause() {
    if (!this.noPause) {
      this.isPlaying = false;
      this.resetTimer();
    }
  }

  public addSlide(slide:Slide) {
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

  public removeSlide(slide:Slide) {
    this.slides.splice(slide.index, 1);

    if (this.slides.length === 0) {
      this.currentSlide = null;
      return;
    }

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].index = i;
    }
  }
}

@Component({
  selector: 'slide',
  directives: [NgClass],
  template: `
    <div [ngClass]="{active: active}" class="item text-center">
      <ng-content></ng-content>
    </div>
  `
})
export class Slide implements OnInit, OnDestroy {
  @Input() public index:number;
  @Input() public direction:Direction;

  @HostBinding('class.active')
  @Input() public active:boolean;

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  private addClass:boolean = true;

  constructor(private carousel:Carousel) {
  }

  public ngOnInit() {
    this.carousel.addSlide(this);
  }

  public ngOnDestroy() {
    this.carousel.removeSlide(this);
  }
}

export const CAROUSEL_DIRECTIVES:Array<any> = [Carousel, Slide];
// will be deprecated
export const carousel:Array<any> = [Carousel, Slide];
