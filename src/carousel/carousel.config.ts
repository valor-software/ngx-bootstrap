import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselConfig {
  /* Default interval of auto changing of slides */
  interval: WritableSignal<number> = signal(5000);

  /* Is loop of auto changing of slides can be paused */
  noPause: WritableSignal<boolean> = signal(false);

  /* Is slides can wrap from the last to the first slide */
  noWrap: WritableSignal<boolean> = signal(false);

  /* Show carousel-indicators */
  showIndicators: WritableSignal<boolean> = signal(true);

  /* Slides can be paused on focus */
  pauseOnFocus: WritableSignal<boolean> = signal(false);

  /* If `true` - carousel indicators indicate slides chunks works ONLY if singleSlideOffset = FALSE */
  indicatorsByChunk: WritableSignal<boolean> = signal(false);

  /* If value more then 1 — carousel works in multilist mode */
  itemsPerSlide: WritableSignal<number> = signal(1);

  /* If `true` — carousel shifts by one element. By default carousel shifts by number
    of visible elements (itemsPerSlide field) */
  singleSlideOffset: WritableSignal<boolean> = signal(false);
}
