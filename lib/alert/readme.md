### Usage
```typescript
import {Alert} from 'ng2-bootstrap';
```

### Annotations
```typescript
// class Alert implements OnInit
@Component({
  selector: 'alert',
  properties: ['type', 'dismissible', 'dismissOnTimeout'],
  events: ['close'],
})
```

### Alert properties
- `type` (`?:string='warning'`) - provide one of the four supported contextual classes:
`success`,`info`, `warning`, `danger`
- `dismissible` (`?:boolean=false`) - determines if an inline close button is displayed
- `dismiss-on-timeout` (`?number=0`) - number of milliseconds, if specified sets a timeout duration, after which the alert will be closed
- `template-url` (*not yet supported*) - allows to provide message template

### Alert events
- `close` - fired when `alert` closed with inline button or by timeout, `$event` is an instance of `Alert` component

*Will be deprecated*: The presence of the `(close)` event handler determines
if a close button is displayed, use `dismissible` instead

