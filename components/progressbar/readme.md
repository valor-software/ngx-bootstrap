### Usage
```typescript
import { ProgressbarModule } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { ProgressbarModule } from 'ng2-bootstrap/components/progressbar';
```

### Annotations
```typescript
// class Progress implements OnInit
@Directive({ selector: 'bs-progress, [progress]' })
export class ProgressDirective implements OnInit {
  @Input() public animate:boolean;

  @HostBinding('attr.max')
  @Input() public get max():number {}

  @HostBinding('class') public addClass = 'progress';
}

// class Bar implements OnInit, OnDestroy
@Component({
  selector: 'bar, [bar]'
})
export class BarComponent implements OnInit, OnDestroy {
  @Input() public type:string;
  @Input() public get value():number
}

// class Progressbar
@Component({
  selector: 'progressbar, [progressbar]'
})
export class ProgressbarComponent {
  @Input() public animate:boolean;
  @Input() public max:number;
  @Input() public type:string;
  @Input() public value:number;
}```

### Properties
**Note**: all components have same meaning of properties
  - `value` (`*number`) - current value of progress bar
  - `type` (`*string`) - provide one of the four supported contextual classes:
  `success`,`info`, `warning`, `danger`
  - `max` (`?number=100`) - maximum total value of progress element
  - `animate` (`?boolean=true`) - if `true` changing `value` of progress bar will be animated (*note*: not supported by Bootstrap 4)
