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
  @Input('tooltipPlacement') private placement:string = 'top';
  @Input('tooltipIsOpen') private isOpen:boolean;
  @Input('tooltipEnable') private enable:boolean;
  @Input('tooltipAppendToBody') private appendToBody:boolean;
}
```

### Tooltip properties
  - `tooltip` (`string`) - text of tooltip
  - `tooltipPlacement` (`?string='top'`) - tooltip positioning instruction, supported positions: 'top', 'bottom', 'left', 'right'
  - `tooltipAnimation` (`?boolean=true`) - if `false` fade tooltip animation will be disabled
  - `tooltipPopupDelay` (*not implemented*) (`?numer=0`) - time in milliseconds before tooltip occurs
  - `tooltipTrigger` (*not implemented*) (`?Array<string>`) - array of event names which triggers tooltip opening
  - `tooltipEnable` (*not implemented*) (`?boolean=true`) - if `false` tooltip is disabled and will not be shown
  - `tooltipAppendToBody` (*not implemented*) (`?boolean=false`) - if `true` tooltip will be appended to body
  - `tooltipClass` (*not implemented*) (`?string`) - custom tooltip class applied to the tooltip container.
  - `tooltipIsOpen` (`?boolean=false`) - if `true` tooltip is currently visible
