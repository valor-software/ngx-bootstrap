### Usage
```typescript
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/components/accordion';
```

### Annotations
```typescript
// component Accordion
@Component({
  selector: 'accordion',
  template: `<ng-content></ng-content>`
})
export class Accordion {
  @Input() public closeOthers:boolean;

  @HostBinding('class.panel-group')
  private addClass = true;
}

// component AccordionGroup
@Component({
  selector: 'accordion-group',
  directives: [Collapse, NgClass]
})
export class AccordionGroup implements OnInit, OnDestroy {
  @Input() public heading:string;
  @Input() public panelClass:string;
  @Input() public isDisabled:boolean;

  @HostBinding('class.panel-open')
  @Input() public get isOpen();

  // should be inside of Accordion element
  constructor(private accordion:Accordion) {}
}

export const ACCORDION_DIRECTIVES:Array<any> = [Accordion, AccordionGroup];
```

### Accordion properties
  - `closeOthers` (`?boolean=false`) - if `true` expanding one item will close all others

### Accordion Group properties
  - `heading` (`?string=''`) - clickable text in accordion's group header, check `accordion heading` below for using html in header
  - `isOpen` (`?boolean=false`) - is accordion group open or closed
  - `isDisabled` (`?boolean=false`) - if `true` disables accordion group
  - `panelClass` (`?string='panel-default'`) - provides an ability to use Bootstrap's contextual panel classes (`panel-primary`, `panel-success`, `panel-info`, etc...). List of all available classes [link](http://getbootstrap.com/components/#panels-alternatives)

### Accordion heading

Instead of the `heading` attribute on the `accordion-group`, you can use an `accordion-heading` attribute on `any` element inside a group that will be used as the group's header template.
