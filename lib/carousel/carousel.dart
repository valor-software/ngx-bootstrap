import "package:angular2/angular2.dart";
import "../ng2-bootstrap-config.dart";

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
    inputs: const [ "interval", "noTransition", "noPause", "noWrap"],
    template: '''
<div (mouseenter)="pause()" (mouseleave)="play()" class="carousel slide">
  <ol class="carousel-indicators" [hidden]="slides.length <= 1">
     <li *ng-for="#slidez of slides" [ng-class]="{active: slidez.active === true}" (click)="select(slidez)"></li>
  </ol>
  <div class="carousel-inner"><ng-content></ng-content></div>
</div>
  ''', directives: const [ CORE_DIRECTIVES, NgClass])
class Carousel implements OnDestroy {
  bool noPause = false;

  bool noWrap;

  List<Slide> slides = [];

  Timer currentInterval;

  bool isPlaying = false;

  bool destroyed = false;

  Slide currentSlide;

  num interval;

  onDestroy() {
    this.destroyed = true;
  }

//  String get interval => _interval.toString();
//
//  set interval(String value) {
//    _interval = int.parse(value);
//    restartTimer();
//  }

  select(Slide nextSlide, [ Direction direction = Direction.UNKNOWN ]) {
    var nextIndex = nextSlide.index;
    if (identical(direction, Direction.UNKNOWN)) {
      direction =
      nextIndex > getCurrentIndex() ? Direction.NEXT : Direction.PREV;
    }
    // Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide != null && nextSlide != currentSlide) {
      goNext(nextSlide, direction);
    }
  }

  goNext(Slide slide, Direction direction) {
    if (destroyed) {
      return;
    }
    slide.direction = direction;
    slide.active = true;
    if (currentSlide != null) {
      currentSlide.direction = direction;
      currentSlide.active = false;
    }
    currentSlide = slide;
    // every time you change slides, reset the timer
    restartTimer();
  }

  getSlideByIndex(num index) {
    var len = slides.length;
    for (var i = 0; i < len; ++i) {
      if (identical(slides [ i ].index, index)) {
        return slides [ i ];
      }
    }
  }

  int getCurrentIndex() {
    return falsey(currentSlide) ? 0 : currentSlide.index;
  }

  next() {
    var newIndex = (getCurrentIndex() + 1) % slides.length;
    if (identical(newIndex, 0) && noWrap) {
      pause();
      return null;
    }
    return select(getSlideByIndex(newIndex), Direction.NEXT);
  }

  prev() {
    var newIndex = getCurrentIndex() - 1 < 0
        ? slides.length - 1
        : getCurrentIndex() - 1;
    if (noWrap && identical(newIndex, slides.length - 1)) {
      pause();
      return null;
    }
    return select(getSlideByIndex(newIndex), Direction.PREV);
  }

  restartTimer() {
    resetTimer();
    var intervalAux = interval.toInt();
    if (intervalAux != double.NAN && intervalAux > 0) {
      currentInterval = new Timer(new Duration(milliseconds: intervalAux), () {
        var nInterval = interval;
        if (isPlaying && intervalAux != double.NAN && nInterval > 0 &&
            truthy(slides.length)) {
          next();
        } else {
          pause();
        }
      });
    }
  }

  resetTimer() {
    if (truthy(currentInterval)) {
      currentInterval.cancel();
      currentInterval = null;
    }
  }

  play() {
    if (!isPlaying) {
      isPlaying = true;
      restartTimer();
    }
  }

  pause() {
    if (!noPause) {
      isPlaying = false;
      resetTimer();
    }
  }

  addSlide(Slide slide) {
    slide.index = slides.length;
    push(slides, slide);
    if (identical(slides.length, 1) || slide.active) {
      select(slides [ slides.length - 1 ]);
      if (identical(slides.length, 1)) {
        play();
      }
    } else {
      slide.active = false;
    }
  }

  removeSlide(Slide slide) {
    splice(slides, slide.index, 1);
    if (identical(slides.length, 0)) {
      currentSlide = null;
      return;
    }
    for (var i = 0; i < slides.length; i ++) {
      slides [ i ].index = i;
    }
  }
}

@Component (selector: "slide, [slide]",
    inputs: const [ "direction", "active", "index"],
    host: const {
      "[class.active]" : "active",
      "[class.item]" : "true",
      "[class.carousel-item]" : "true"
    },
    template: '''
  <div [ng-class]="{active: active}" class="item text-center">
    <ng-content></ng-content>
  </div>
  ''', directives: const [NgClass])
class Slide implements OnInit, OnDestroy {
  Carousel carousel;

  bool active;

  Direction direction;

  num index;

  Slide(this.carousel) {}

  onInit() {
    carousel.addSlide(this);
  }

  onDestroy() {
    carousel.removeSlide(this);
  }
}

const CAROUSEL_DIRECTIVES = const [Carousel, Slide];