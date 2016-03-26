### Usage
```typescript
import { Affix } from 'ng2-bootstrap/ng2-bootstrap';
```

### Annotations
```typescript
// class Affix

@Directive({
    selector: '[affix]'
})
export class Affix implements OnInit, OnDestroy {

    @Input()
    public affixOffsetTop:number = 0;
    @Input()
    public affixOffsetBottom:number = 0;

    @Output()
    public affixChange:EventEmitter<AffixStatusChange> = new EventEmitter(false);
}
```

### Alert properties
- `affixOffsetTop` (`?:number=0`) - Pixels to offset from screen top when calculating position of scroll.
- `affixOffsetBottom` (*not implemented*) (`?:number=0`) - Pixels to offset from screen bottom top when calculating position of scroll.

### Affix events
- `affixChange` - fired when the affix state changes. `$event` is an instance of `AffixStatusChange` class, having two properties `oldStatus` and `newStatus`.
