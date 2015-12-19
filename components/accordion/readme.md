### Usage
```typescript
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
```

### Annotations
```typescript
// class Accordion
@Component({
  selector: 'accordion',
  template: `<ng-content></ng-content>`
})
export class Accordion {
  @Input() private templateUrl:string;
  @Input() private closeOthers:boolean;

  @HostBinding('class.panel-group')
  private addPanelGroupClass = true;
}

// class AccordionGroup implements OnInit, OnDestroy
@Component({
  selector: 'accordion-group',
  directives: [Collapse, AccordionTransclude, NgClass]
})
export class AccordionGroup implements OnInit, OnDestroy {
  @Input() private templateUrl:string;
  @Input() private heading:string;
  @Input() private panelClass:string;
  @Input() public isDisabled:boolean;

  @HostBinding('class.panel-open')
  @Input() public get isOpen();

  constructor(private accordion:Accordion) {}
}

// class AccordionHeading
@Directive({selector: '[accordion-heading]'})
export class AccordionHeading {
  constructor(private group:AccordionGroup, private templateRef:TemplateRef) {}


export const ACCORDION_DIRECTIVES:Array<any> = [Accordion, AccordionGroup, AccordionHeading];
```

### Accordion properties
  - `close-others` (`?boolean=false`) - if `true` expanding one item will close all others
  - `template-url` (*not yet supported*) - allows to override the template url of component (default: `components/accordion/accordion.html`)

### Accordion Group properties
  - `heading` (`?string=''`) - clickable text in accordion's group header
  - `is-open` (`?boolean=false`) - is accordion group open or closed
  - `is-disabled` (`?boolean=false`) - if `true` disables accordion group
  - `panel-class` (`?string='panel-default'`) - provides an ability to use Bootstrap's contextual panel classes (`panel-primary`, `panel-success`, `panel-info`, etc...). List of all available classes [link](http://getbootstrap.com/components/#panels-alternatives)
  - `template-url` (*not yet supported*) - allows to override the template url of component (default: `components/accordion/accordion-group.html`)

### Accordion heading

Instead of the `heading` attribute on the `accordion-group`, you can use an `accordion-heading` attribute on `template` element inside a group that will be used as the group's header.
