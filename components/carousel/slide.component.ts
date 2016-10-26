import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {CarouselComponent, Direction} from './carousel.component';

@Component({
  selector: 'slide',
  template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `
})
export class SlideComponent implements OnInit, OnDestroy {
  @Input() public index: number;
  @Input() public direction: Direction;

  private _active: boolean;
  private _previousSiblingSlide: SlideComponent;
  private _nextSiblingSlide: SlideComponent;

  @HostBinding('class.active')
  @Input()
  public set active(value: boolean) {
    this._active = value;
    this.changeSiblingsState();
    this.direction = Direction.UNKNOWN;
  }

  public get active() {
    return this._active;
  }

  public set previousSiblingSlide(value: SlideComponent) {
    this._previousSiblingSlide = value;
  }

  public set nextSiblingSlide(value: SlideComponent) {
    this._nextSiblingSlide = value;
  }
  public get hasNextSibling(){
    return this._nextSiblingSlide != null;
  }
  public get hasPreviousSibling(){
    return this._previousSiblingSlide != null;
  }

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  public addClass: boolean = true;

  private carousel: CarouselComponent;

  public constructor(carousel: CarouselComponent) {
    this.carousel = carousel;
  }

  public ngOnInit(): void {
    this.carousel.addSlide(this);
  }

  public ngOnDestroy(): void {
    this.carousel.removeSlide(this);
  }

  private changeSiblingsState() {
    switch (this.direction) {
         case Direction.NEXT:
        if (!this._previousSiblingSlide)
          return;
        this._previousSiblingSlide.direction = Direction.NEXT;
        this._previousSiblingSlide.active = false;
        break;
      case Direction.PREV:
        if (!this._nextSiblingSlide)
          return;
        this._nextSiblingSlide.direction = Direction.PREV;
        this._nextSiblingSlide.active = false;
        break;
      case Direction.UNKNOWN:
      default:
        if (this._nextSiblingSlide) {
          this._nextSiblingSlide.direction = this.direction;
          this._nextSiblingSlide.active = false;
        }
        if (this._previousSiblingSlide) {
          this._previousSiblingSlide.direction = this.direction;
          this._previousSiblingSlide.active = false;
        }
        break;
    }
  }
}
