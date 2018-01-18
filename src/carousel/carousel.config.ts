import { Injectable } from '@angular/core';

@Injectable()
export class CarouselConfig {
  /** Default interval of auto changing of slides */
  interval = 5000;

  /** Is loop of auto changing of slides can be paused */
  noPause = false;

  /** Is slides can wrap from the last to the first slide */
  noWrap = false;

  /** Show carousel-indicators */
  showIndicators = true;
}
