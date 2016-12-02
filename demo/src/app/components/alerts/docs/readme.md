### Usage
```typescript
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { AlertModule } from 'ng2-bootstrap/components/alert';
```

### Annotations
```typescript
// class Alert
@Component({
  selector: 'alert',
  template: ALERT_TEMPLATE
})
export class AlertComponent implements OnInit {
  @Input() public type:string = 'warning';
  @Input() public dismissible:boolean;
  @Input() public dismissOnTimeout:number;

  @Output() public close:EventEmitter<Alert> = new EventEmitter(false);
}
```

### Alert properties
- `type` (`?:string='warning'`) - provide one of the four supported contextual classes:
`success`,`info`, `warning`, `danger`
- `dismissible` (`?:boolean=false`) - determines if an inline close button is displayed
- `dismissOnTimeout` (`?number=0`) - number of milliseconds, if specified sets a timeout duration, after which the alert will be closed

### Alert events
- `close` - fired when `alert` closed with inline button or by timeout, `$event` is an instance of `Alert` component
