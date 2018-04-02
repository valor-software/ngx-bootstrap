import {
  Component,
  HostBinding,
  OnDestroy,
  Input,
  OnInit
} from '@angular/core';

import { CarouselComponent } from './carousel.component';

@Component({
  selector: 'slide',
  template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[attr.aria-hidden]': '!active'
  }
})
export class SlideComponent implements OnInit, OnDestroy {
  /** Is current slide active */
  @HostBinding('class.active')
  @Input()
  active: boolean;

  /** Wraps element by appropriate CSS classes */
  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  addClass = true;

  /** Link to Parent(container-collection) component */
  protected carousel: CarouselComponent;

  constructor(carousel: CarouselComponent) {
    this.carousel = carousel;
  }

  /** Fires changes in container collection after adding a new slide instance */
  ngOnInit(): void {
    this.carousel.addSlide(this);
  }

  /** Fires changes in container collection after removing of this slide instance */
  ngOnDestroy(): void {
    this.carousel.removeSlide(this);
  }
}
