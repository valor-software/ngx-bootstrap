### Usage
```typescript
import { Alert } from 'ng2-bootstrap/ng2-bootstrap';
```

### Annotations
```typescript
// class Alert
@Component({
  selector: 'alert',
  directives: [NgIf, NgClass],
  template: ALERT_TEMPLATE
})
export class Alert implements OnInit {
  @Input() public type:string = 'warning';
  @Input() public dismissible:boolean;
  @Input() public dismissOnTimeout:number;

  @Output() public close:EventEmitter<Alert> = new EventEmitter();
}
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

