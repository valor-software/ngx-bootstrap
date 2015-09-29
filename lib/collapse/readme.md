### Usage
```typescript
import {Collapse} from 'ng2-bootstrap';
```

### Annotations
```typescript
// class Collapse
@Directive({
  selector: '[collapse]',
  properties: ['collapse'],
  host: {
    '[class.in]': 'isExpanded',
    '[class.collapse]': 'isCollapse',
    '[class.collapsing]': 'isCollapsing',
    '[attr.aria-expanded]': 'isExpanded',
    '[attr.aria-hidden]': 'isCollapsed',
    '[style.height]': 'height'
  }
})
```

### Collapse properties
- `collapse` (`boolean=false`) - if `true` collapse block will be expanded
