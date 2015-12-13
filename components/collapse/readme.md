### Usage
```typescript
import { Collapse } from 'ng2-bootstrap/ng2-bootstrap';
```

### Annotations
```typescript
// class Collapse
@Directive({ selector: '[collapse]' })
export class Collapse {
  @Input() private set collapse(value:boolean) {}
  // style
  @HostBinding('style.height')
  private height:string;
  // shown
  @HostBinding('class.in')
  @HostBinding('attr.aria-expanded')
  private isExpanded:boolean = true;
  // hidden
  @HostBinding('attr.aria-hidden')
  private isCollapsed:boolean = false;
  // stale state
  @HostBinding('class.collapse')
  private isCollapse:boolean = true;
  // animation state
  @HostBinding('class.collapsing')
  private isCollapsing:boolean = false;
}
```

### Collapse properties
- `collapse` (`boolean=false`) - if `true` collapse block will be expanded
