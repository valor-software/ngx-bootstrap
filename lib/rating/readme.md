### Usage
```typescript
import {Rating} from 'ng2-bootstrap';
```

### Annotations
```typescript
// class Rating implements on Init
@Component({
  selector: 'rating[ng-model]',
  properties: [
    'max', 'readonly', 'titles',
    'stateOn', 'stateOff',
    'ratingStates'
  ],
  events: ['onHover', 'onLeave'],
  host: {
    '(keydown)': 'onKeydown($event)'
  },
})
```

### Rating properties
  - `max` (`?number=5`) - number of icons
  - `readonly` (`?boolean=false`) - if `true` will not react on any user events
  - `titles` (`?Array<string>`) - array of icons titles, default: (`["one", "two", "three", "four", "five"]`)
  - `state-on` (`?string='glyphicon-star'`) - selected icon class
  - `state-off` (`?string='glyphicon-star-empty'`) - unselected icon class
  - `rating-states` (`?Array<{stateOn:string, stateOff:string}>`) - array of custom icons classes

### Rating events
  - `on-hover` - fired when icon selected, `$event:number` equals to selected rating
  - `on-leave` - fired when icon selected, `$event:number` equals to previous rating value
