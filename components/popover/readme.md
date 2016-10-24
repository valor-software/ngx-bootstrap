### Usage
```typescript
import { PopoverModule } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { PopoverModule } from 'ng2-bootstrap/components/popover';
```

### Annotations
```typescript
@Directive({
  selector: '[popover], [popoverHtml]',
  exportAs: 'bs-popover'
})
export class PopoverDirective {
  @Input('popover') public content: string;
  @Input('popoverHtml') public htmlContent: string | TemplateRef<any>;
  @Input('popoverPlacement') public placement: string = 'top';
  @Input('popoverIsOpen') public isOpen: boolean;
  @Input('popoverEnable') public enable: boolean = true;
  @Input('popoverAnimation') public animation: boolean = true;
  @Input('popoverAppendToBody') public appendToBody: boolean;
  @Input('popoverClass') public popupClass: string;
  @Input('popoverContext') public context: any;
  @Input('popoverPopupDelay') public delay: number = 0;
  @Input('popoverTitle') public title: string;
  @Output('popoverStateChanged') public stateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
}
```

### Popover properties
  - `popover` (`string`) - text of popover
  - `popoverHtml` (`string|TempalteRef`) - popover custom html content, defined as string or template reference
  - `popoverTitle` (`string`) - popover title. If omitted (or falsey), no title will be displayed
  - `popoverPlacement` (`?string='top'`) - popover positioning instruction, supported positions: 'top', 'bottom', 'left', 'right'
  - `popoverAnimation` (`?boolean=true`) - if `false` fade popover animation will be disabled
  - `popoverPopupDelay` (`?numer=0`) - time in milliseconds before popover occurs
  - `popoverTrigger` (*not implemented*) (`?Array<string>`) - array of event names which triggers popover opening
  - `popoverEnable` (`?boolean=true`) - if `false` popover is disabled and will not be shown
  - `popoverAppendToBody` (*not implemented*) (`?boolean=false`) - if `true` popover will be appended to body
  - `popoverClass` (`?string`) - custom popover class applied to the popover container
  - `popoverIsOpen` (`?boolean=false`) - if `true` popover is currently visible
  - `popoverContext` (`any`) - if a template is used for the content, then this property can be used to specify a context for that template. The template variable exposed is called 'model'.

### Popover events
  - `popoverStateChanged` - This event fires each time the state of the popover is changed. Argument is boolean stating if the popover is visible or not.
