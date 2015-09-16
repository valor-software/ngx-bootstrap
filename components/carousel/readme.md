### Usage
```typescript
import {carousel} from 'ng2-bootstrap';
```

### Annotations
```typescript
// class Carousel implements OnDestroy
@Component({
  selector: 'carousel, [carousel]',
  properties: ['interval', 'noTransition', 'noPause', 'noWrap'],
})

// class Slide implements OnInit, OnDestroy
@Component({
  selector: 'slide, [slide]',
  properties: ['direction', 'active', 'index'],
  host: {
    '[class.active]': 'active',
    '[class.item]': 'true',
    '[class.carousel-item]': 'true'
  },
})

export const carousel:Array<any> = [Carousel, Slide];
```

### Carousel properties
- `interval` (`?number=5000`) - amount of time in milliseconds to delay between automatically cycling an item. If `false`, carousel will not automatically cycle
- `no-transition` (`?boolean=false`) - if `true` will disable transitions on the carousel
- `no-pause` (`?boolean=false`) - if `true` will disable pausing on carousel mouse hover
- `no-wrap` (`?boolean=false`) - if `true` the carousel will not cycle continuously and will have hard stops (prevent looping)
- `pause` (*not yet supported*) (`?string='hover'`) - event group name which pauses the cycling of the carousel, if `hover` pauses on mouseenter and resumes on mouseleave
- `keyboard` (*not yet supported*) (`?boolean=true`) - if `false` carousel will not react to keyboard events
- `template-url` (*not yet supported*) - allows to override the template url of component (default: `components/carousel/carousel.html`)
- *note*: swiping not yet supported

### Slide properties
- `active` (`?boolean=false`) - currently active slide
- `index` (`?number`) - index of slide in carousel's slides
- `direction` (`?string`) (*not yet supported*)
- `actual` (*not yet supported*) (`?any`) - will be bind to slider context, to be used from template
- `template-url` (*not yet supported*) (`?string='hover'`) - allows to override the template url of component (default: `components/carousel/slide.html`)
