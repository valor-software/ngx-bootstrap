### Usage
```typescript
import { Collapse } from 'ng2-bootstrap/ng2-bootstrap';
```

### Annotations
```typescript
// class Collapse
@Directive({ selector: '[collapse]' })
export class Collapse {
  @Input() public set collapse(value:boolean) {}
}
```

### Collapse properties
- `collapse` (`boolean=false`) - if `false` collapse block will be expanded
