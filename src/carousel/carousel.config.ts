import { Injectable } from '@angular/core';

@Injectable()
export class CarouselConfig {
  /** Default interval of auto changing of slides */
  public interval: number = 5000;

  /** Is loop of auto changing of slides can be paused */
  public noPause: boolean = false;

  /** Is slides can wrap from the last to the first slide */
  public noWrap: boolean = false;
}
