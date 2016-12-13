import { Injectable } from '@angular/core';

@Injectable()
export class CarouselConfig {
  public interval: number = 5000;
  public noPause: boolean = false;
  public noWrap: boolean = false;
}
