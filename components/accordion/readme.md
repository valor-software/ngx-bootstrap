### Usage
```typescript
import {accordion} from 'ng2-bootstrap';
```

### Annotations
```typescript
// class Accordion
@Component({
  selector: 'accordion, [accordion]',
  properties: ['templateUrl', 'closeOthers'],
  host: {
    '[class.panel-group]': 'true'
  }
})

// class AccordionGroup implements OnInit, OnDestroy
@Component({
  selector: 'accordion-group, [accordion-group]',
  properties: ['templateUrl', 'heading', 'isOpen', 'isDisabled', 'panelClass'],
  host: {
    '[class.panel-open]': 'isOpen'
  },
})

// class AccordionHeading
@Directive({
  selector: 'accordion-heading, [accordion-heading]'
})


export const accordion:Array<any> = [Accordion, AccordionGroup, AccordionHeading];
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
