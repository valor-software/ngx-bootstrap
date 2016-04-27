### Usage
```typescript
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';
```

### Annotations
```typescript
// class Collapse
@Directive({ selector: '[collapse]' })
export class CollapseDirective {
  @Input() public set collapse(value:boolean) {}
}
```

### Collapse properties
- `collapse` (`boolean=false`) - if `false` collapse block will be expanded
