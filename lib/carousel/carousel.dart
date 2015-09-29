/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Directive, OnInit, OnDestroy, EventEmitter, ElementRef, CORE_DIRECTIVES, NgClass;
import "../ng2-bootstrap-config.dart"
    show Ng2BootstrapConfig, Ng2BootstrapTheme;

import "package:node_shims/js.dart";
import 'dart:async';

enum Direction { UNKNOWN, NEXT, PREV }
// todo: add animate
const NAVIGATION = const {
Ng2BootstrapTheme.BS4 :
'''
<a class="left carousel-control" (click)="prev()" [hidden]="!slides.length">
  <span class="icon-prev" aria-hidden="true"></span>
  <span class="sr-only">Previous</span>
</a>
<a class="right carousel-control" (click)="next()" [hidden]="!slides.length">
  <span class="icon-next" aria-hidden="true"></span>
  <span class="sr-only">Next</span>
</a>
  ''',
  Ng2BootstrapTheme.BS3 : '''
<a class="left carousel-control" (click)="prev()" [hidden]="!slides.length">
  <span class="glyphicon glyphicon-chevron-left"></span>
</a>
<a class="right carousel-control" (click)="next()" [hidden]="!slides.length">
  <span class="glyphicon glyphicon-chevron-right"></span>
</a>
  '''
};

@Component (selector: "carousel, [carousel]",
    properties: const [ "interval", "noTransition", "noPause", "noWrap"])
@View (template: '''
<div (mouseenter)="pause()" (mouseleave)="play()" class="carousel slide">
  <ol class="carousel-indicators" [hidden]="slides.length <= 1">
     <li *ng-for="#slidez of slides" [ng-class]="{active: slidez.active === true}" (click)="select(slidez)"></li>
  </ol>
  <div class="carousel-inner"><ng-content></ng-content></div>
  \${ NAVIGATION [ Ng2BootstrapConfig.theme ]}
</div>
  ''', directives: const [ CORE_DIRECTIVES, NgClass])
class Carousel implements OnDestroy {
  bool noPause;

  bool noWrap;

  List<Slide> slides = [];

  Timer currentInterval;

  bool isPlaying;

  bool destroyed = false;

  Slide currentSlide;

  int _interval;

  onDestroy() {
    this.destroyed = true;
  }

  int get interval => _interval;

  set interval(int value) {
    this._interval = value;
    this.restartTimer();
  }

  select(Slide nextSlide, [ Direction direction = Direction.UNKNOWN ]) {
    var nextIndex = nextSlide.index;
    if (identical(direction, Direction.UNKNOWN)) {
      direction =
      nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
    }
    // Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide && !identical(nextSlide, this.currentSlide)) {
      this.goNext(nextSlide, direction);
    }
  }

  goNext(Slide slide, Direction direction) {
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

  getSlideByIndex(num index) {
    var len = this.slides.length;
    for (var i = 0; i < len; ++i) {
      if (identical(this.slides [ i ].index, index)) {
        return this.slides [ i ];
      }
    }
  }

  int getCurrentIndex() {
    return falsey(this.currentSlide) ? 0 : this.currentSlide.index;
  }

  next() {
    var newIndex = (this.getCurrentIndex() + 1) % this.slides.length;
    if (identical(newIndex, 0) && this.noWrap) {
      this.pause();
      return;
    }
    return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
  }

  prev() {
    var newIndex = this.getCurrentIndex() - 1 < 0
        ? this.slides.length - 1
        : this.getCurrentIndex() - 1;
    if (this.noWrap && identical(newIndex, this.slides.length - 1)) {
      this.pause();
      return;
    }
    return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
  }

  restartTimer() {
    this.resetTimer();
    var interval = this.interval;
    if (interval != double.NAN && interval > 0) {
      this.currentInterval = new Timer(new Duration(milliseconds: interval), () {
        var nInterval = this.interval;
        if (this.isPlaying && interval != double.NAN && nInterval > 0 &&
            truthy(this.slides.length)) {
          this.next();
        } else {
          this.pause();
        }
      });
    }
  }

  resetTimer() {
    if (truthy(currentInterval)) {
      currentInterval.cancel();
      this.currentInterval = null;
    }
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.restartTimer();
    }
  }

  pause() {
    if (!this.noPause) {
      this.isPlaying = false;
      this.resetTimer();
    }
  }

  addSlide(Slide slide) {
    slide.index = this.slides.length;
    push(this.slides, slide);
    if (identical(this.slides.length, 1) || slide.active) {
      this.select(this.slides [ this.slides.length - 1 ]);
      if (identical(this.slides.length, 1)) {
        this.play();
      }
    } else {
      slide.active = false;
    }
  }

  removeSlide(Slide slide) {
    splice(this.slides, slide.index, 1);
    if (identical(this.slides.length, 0)) {
      this.currentSlide = null;
      return;
    }
    for (var i = 0; i < this.slides.length; i ++) {
      this.slides [ i ].index = i;
    }
  }
}

@Component (selector: "slide, [slide]",
    properties: const [ "direction", "active", "index"],
    host: const {
      "[class.active]" : "active",
      "[class.item]" : "true",
      "[class.carousel-item]" : "true"
    })
@View (template: '''
  <div [ng-class]="{active: active}" class="item text-center">
    <ng-content></ng-content>
  </div>
  ''', directives: const [NgClass])
class Slide implements OnInit, OnDestroy {
  Carousel carousel;

  bool active;

  Direction direction;

  num index;

  Slide(this .carousel) {}

  onInit() {
    this.carousel.addSlide(this);
  }

  onDestroy() {
    this.carousel.removeSlide(this);
  }
}

const List carousel = const [ Carousel, Slide];