import {Component, OnInit, OnDestroy, Input, HostBinding} from 'angular2/core';
import {Carousel, Direction} from './carousel.component';

@Component({
  selector: 'slide',
  template: `
    <div [class.active]="active" class="item text-center">
      <ng-content></ng-content>
    </div>
  `
})
export class Slide implements OnInit, OnDestroy {
  @Input() public index:number;
  @Input() public direction:Direction;

  @HostBinding('class.active')
  @Input() public active:boolean;

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  public addClass:boolean = true;

  private carousel:Carousel;

  public constructor(carousel:Carousel) {
    this.carousel = carousel;
  }

  public ngOnInit():void {
    this.carousel.addSlide(this);
  }

  public ngOnDestroy():void {
    this.carousel.removeSlide(this);
  }
}
