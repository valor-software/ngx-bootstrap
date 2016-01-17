### Usage
```typescript
import { CAROUSEL_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
```

### Annotations
```typescript
// class Carousel implements OnDestroy
@Component({
  selector: 'carousel',
  directives: [NgFor]
})
export class Carousel implements OnDestroy {
  @Input() private noWrap:boolean;
  @Input() private noPause:boolean;
  @Input() private noTransition:boolean;

  @Input() public get interval():number {}
}

// class Slide implements OnInit, OnDestroy
@Component({
  selector: 'slide',
  directives: [NgClass]
})
export class Slide implements OnInit, OnDestroy {
  @Input() public index:number;
  @Input() public direction:Direction;

  @HostBinding('class.active')
  @Input() public active:boolean;

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  private addClass:boolean = true;
}

export const CAROUSEL_DIRECTIVES:Array<any> = [Carousel, Slide];
```

### Carousel properties
- `interval` (`?number=5000`) - amount of time in milliseconds to delay between automatically cycling an item. If `false`, carousel will not automatically cycle
- `noTransition` (`?boolean=false`) - if `true` will disable transitions on the carousel
- `noPause` (`?boolean=false`) - if `true` will disable pausing on carousel mouse hover
- `noWrap` (`?boolean=false`) - if `true` the carousel will not cycle continuously and will have hard stops (prevent looping)
- `pause` (*not yet supported*) (`?string='hover'`) - event group name which pauses the cycling of the carousel, if `hover` pauses on mouseenter and resumes on mouseleave
- `keyboard` (*not yet supported*) (`?boolean=true`) - if `false` carousel will not react to keyboard events
- *note*: swiping not yet supported

### Slide properties
- `active` (`?boolean=false`) - currently active slide
- `index` (`?number`) - index of slide in carousel's slides
- `direction` (`?string`) (*not yet supported*)
- `actual` (*not yet supported*) (`?any`) - will be bind to slider context, to be used from template
