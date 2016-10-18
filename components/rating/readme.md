### Usage
```typescript
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { RatingModule } from 'ng2-bootstrap/components/rating';
```

### Annotations
```typescript
// class Rating implements on Init
@Component({
  selector: 'rating[ngModel]'
})
export class RatingComponent implements ControlValueAccessor, OnInit {
  @Input() public max:number;
  @Input() public stateOn:string;
  @Input() public stateOff:string;
  @Input() public readonly:boolean;
  @Input() public titles:Array<string>;
  @Input() public ratingStates:{stateOn:string, stateOff:string}[];

  @Output() public onHover:EventEmitter<number> = new EventEmitter(false);
  @Output() public onLeave:EventEmitter<number> = new EventEmitter(false);
}
```

### Rating properties
  - `max` (`?number=5`) - number of icons
  - `readonly` (`?boolean=false`) - if `true` will not react on any user events
  - `titles` (`?Array<string>`) - array of icons titles, default: (`["one", "two", "three", "four", "five"]`)
  - `stateOn` (`?string='glyphicon-star'`) - selected icon class
  - `stateOff` (`?string='glyphicon-star-empty'`) - unselected icon class
  - `ratingStates` (`?{stateOn:string, stateOff:string}[]`) - array of custom icons classes

### Rating events
  - `onHover` - fired when icon selected, `$event:number` equals to selected rating
  - `onLeave` - fired when icon selected, `$event:number` equals to previous rating value
