import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

import { CarouselComponent, Direction } from './carousel.component';

@Component({
  selector: 'slide',
  template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `
})
export class SlideComponent implements OnInit, OnDestroy {
  @Input() public index:number;
  @Input() public direction:Direction;

  @HostBinding('class.active')
  @Input() public active:boolean;

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  public addClass:boolean = true;

  private carousel:CarouselComponent;

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
