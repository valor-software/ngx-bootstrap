### Usage
```typescript
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
```

### Annotations
```typescript
// class Tooltip implements OnInit
@Directive({ selector: '[tooltip]' })
export class Tooltip implements OnInit {
  @Input('tooltip') private content:string;
  @Input('tooltip-placement') private placement:string = 'top';
  @Input('tooltip-isOpen') private isOpen:boolean;
  @Input('tooltip-enable') private enable:boolean;
  @Input() private appendToBody:boolean;
}
```

### Tooltip properties
  - `tooltip` (`string`) - text of tooltip
  - `tooltip-placement` (`?string='top'`) - tooltip positioning instruction, supported positions: 'top', 'bottom', 'left', 'right'
  - `tooltip-animation` (`?boolean=true`) - if `false` fade tooltip animation will be disabled
  - `tooltip-popup-delay` (*not implemented*) (`?numer=0`) - time in milliseconds before tooltip occurs
  - `tooltip-trigger` (*not implemented*) (`?Array<string>`) - array of event names which triggers tooltip opening
  - `tooltip-enable` (*not implemented*) (`?boolean=true`) - if `false` tooltip is disabled and will not be shown
  - `tooltip-append-to-body` (*not implemented*) (`?boolean=false`) - if `true` tooltip will be appended to body
  - `tooltip-class` (*not implemented*) (`?string`) - custom tooltip class applied to the tooltip container.
  - `tooltip-is-open` (`?boolean=false`) - if `true` tooltip is currently visible
