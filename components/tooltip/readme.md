### Usage
```typescript
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { TooltipModule } from 'ng2-bootstrap/components/tooltip';
```

### Annotations
```typescript
// class Tooltip implements OnInit
@Directive({
  selector: '[tooltip]',
  exportAs: 'bs-tooltip'
})
export class TooltipDirective {
  @Input('tooltip') public content:string;
  @Input('tooltipHtml') public htmlContent:string | TemplateRef<any>;
  @Input('tooltipPlacement') private placement:string = 'top';
  @Input('tooltipIsOpen') private isOpen:boolean;
  @Input('tooltipEnable') private enable:boolean;
  @Input('tooltipAppendToBody') private appendToBody:boolean;
  @Input('tooltipClass') public popupClass:string;
  @Input('tooltipContext') public tooltipContext:any;
  @Input('tooltipPopupDelay') public delay:number = 0;
  @Output() public tooltipStateChanged:EventEmitter<boolean>;
}
```

### Tooltip properties
  - `tooltip` (`string`) - text of tooltip
  - `tooltipHtml` (`string|TempalteRef`) - tooltip custom html content, defined as string or template reference
  - `tooltipPlacement` (`?string='top'`) - tooltip positioning instruction, supported positions: 'top', 'bottom', 'left', 'right'
  - `tooltipAnimation` (`?boolean=true`) - if `false` fade tooltip animation will be disabled
  - `tooltipPopupDelay` (`?numer=0`) - time in milliseconds before tooltip occurs
  - `tooltipTrigger` (*not implemented*) (`?Array<string>`) - array of event names which triggers tooltip opening
  - `tooltipEnable` (`?boolean=true`) - if `false` tooltip is disabled and will not be shown
  - `tooltipAppendToBody` (*not implemented*) (`?boolean=false`) - if `true` tooltip will be appended to body
  - `tooltipClass` (`?string`) - custom tooltip class applied to the tooltip container
  - `tooltipIsOpen` (`?boolean=false`) - if `true` tooltip is currently visible
  - `tooltipContext` (`any`) - if a template is used for the content, then this property can be used to specify a context for that template. The template variable exposed is called 'model'.

### Tooltip events
  - `tooltipStateChanged` - This event fires each time the state of the tooltip is changed. Argument is boolean stating if the tooltip is visible or not.
