/***
 * todo:
 * direction (?string) (not yet supported)
 actual (not yet supported) (?any) - will be bind to slider context, to be used from template
 */
import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

import { CarouselComponent, Direction } from './carousel.component';

/** Wrap your content with `slide` component  */
@Component({
  selector: 'slide',
  template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `
})
export class SlideComponent implements OnInit, OnDestroy {
  /** Index of slide in carousel's slides */
  @Input() public index:number;
  @Input() public direction:Direction;

  /** Is current slide active */
  @HostBinding('class.active')
  @Input() public active:boolean;

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  public addClass:boolean = true;

  protected carousel:CarouselComponent;

  public constructor(carousel:CarouselComponent) {
    this.carousel = carousel;
  }

  public ngOnInit():void {
    this.carousel.addSlide(this);
  }

  public ngOnDestroy():void {
    this.carousel.removeSlide(this);
  }
}
