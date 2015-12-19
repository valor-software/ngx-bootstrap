### Usage
```typescript
import { PROGRESSBAR_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
```

### Annotations
```typescript
// class Progress implements OnInit
@Directive({ selector: 'bs-progress, [progress]' })
export class Progress implements OnInit {
  @Input() public animate:boolean;

  @HostBinding('attr.max')
  @Input() public get max():number {}

  @HostBinding('class') private addClass = 'progress';
}

// class Bar implements OnInit, OnDestroy
@Component({
  selector: 'bar, [bar]',
  directives: [NgClass, NgStyle]
})
export class Bar implements OnInit, OnDestroy {
  @Input() public type:string;
  @Input() public get value():number
}

// class Progressbar
@Component({
  selector: 'progressbar, [progressbar]',
  directives: [Progress, Bar]
})
export class Progressbar {
  @Input() private animate:boolean;
  @Input() private max:number;
  @Input() private type:string;
  @Input() private value:number;
}```

### Properties
**Note**: all components have same meaning of properties
  - `value` (`*number`) - current value of progress bar
  - `type` (`*string`) - provide one of the four supported contextual classes:
  `success`,`info`, `warning`, `danger`
  - `max` (`?number=100`) - maximum total value of progress element
  - `animate` (`?boolean=true`) - if `true` changing `value` of progress bar will be animated (*note*: not supported by Bootstrap 4)
