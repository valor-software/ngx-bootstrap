### Usage
```typescript
import { SliderModule } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { SliderModule } from 'ng2-bootstrap/components/slider';
```

### Annotations
```typescript
// What here ?
```

### Properties
**Note**: all components have same meaning of properties
  - `value` (`*number`) - current value of slider
  - `type` (`*string`) - provide one of the two supported contextual classes:
  `slider`,`range`  (range not supported yet)
  - `orientation` (`*string`) - current orientation of slider: `horizontal`, `vertical`
  - `max` (`?number=100`) - maximum total value of slider
  - `min` (`?number=0`) - minimum value of slider
  - `step` (`?number=1`) - value of step
  - `touchCapable` (`?boolean=true`) - is the slider touch capable
  - `enabled` (`?boolean=true`) - is slider enabled
  - `reversed` (`?boolean=false`) - reverse values of slider
  - `selection` (`?string=before`) - choose witch side to color: `none`, `before`, `after` (not supported yet)
  - `animate` (`?boolean=true`) - if `true` changing `value` of slider will be animated (not supported yet)
