### Usage
```typescript
import { TAB_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
```

```html
<tabset>
  <tab heading='Tab 1'>Tab 1 content</tab>
  <tab>
    <template tab-heading>Tab 2</template>
    Tab 2 content
  </tab>
</tabset>
```

### Annotations
```typescript
// component Tabset
@Component({
  selector: 'tabset',
  directives: [NgClass, NgTransclude]
})
export class Tabset implements OnInit {
  @Input() public vertical:boolean;
  @Input() public justified:boolean;
  @Input() public type:string;
}

// directive Tab
@Directive({ selector: 'tab, [tab]' })
export class Tab implements OnInit, OnDestroy, DoCheck {
  @Input() public heading:string;
  @Input() public disabled:boolean;
  @Input() public removable:boolean;

  /** tab active state toogle */
  @HostBinding('class.active')
  @Input() public get active() {}

  @Output() public select:EventEmitter<Tab> = new EventEmitter(false);
  @Output() public deselect:EventEmitter<Tab> = new EventEmitter(false);
  @Output() public removed:EventEmitter<Tab> = new EventEmitter(false);
}

// directive TabHeading
@Directive({selector: '[tab-heading]'})
export class TabHeading {}

export const TAB_DIRECTIVES:Array<any> = [Tab, TabHeading, Tabset];
```

### Tabset properties
  - `vertical` (`?boolean=false`) - if `true` tabs will be placed vertically
  - `justified` (`?boolean=false`) - if `true` tabs fill the container and have a consistent width
  - `type` (`?string='tabs'`) - navigation context class: 'tabs' or 'pills'

### Tab properties
  - `heading` (`string`) - tab header text
  - `active` (`?boolean=false`) - if tab is active equals true, or set `true` to activate tab
  - `disabled` (`?boolean=false`) - if `true` tab can not be activated
  - `removable` (`?boolean=false`) - if `true` tab can be removable, additional button will appear

### Tab events
  - `select` - fired when `tab` became active, `$event:Tab` equals to selected instance of `Tab` component
  - `deselect` - fired when `tab` became inactive, `$event:Tab` equals to deselected instance of `Tab` component
  - `removed` - fired before `tab` will be removed

### Tab heading
Should be used to mark `<template>` element as a template for tab heading
