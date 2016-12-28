import { Component, HostBinding, OnDestroy, Input, OnInit } from '@angular/core';

import { CarouselComponent } from './carousel.component';

@Component({
  selector: 'slide',
  template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `
})
export class SlideComponent implements OnInit, OnDestroy {

  /** Is current slide active */
  @HostBinding('class.active')
  @Input() public active:boolean;

  /** Wraps element by appropriate CSS classes */
  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  public addClass:boolean = true;

  /** Link to Parent(container-collection) component */
  protected carousel:CarouselComponent;

  public constructor(carousel:CarouselComponent) {
    this.carousel = carousel;
  }

  /** Fires changes in container collection after adding a new slide instance */
  public ngOnInit():void {
    this.carousel.addSlide(this);
  }

  /** Fires changes in container collection after removing of this slide instance */
  public ngOnDestroy():void {
    this.carousel.removeSlide(this);
  }
}
