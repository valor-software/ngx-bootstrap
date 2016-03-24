### Usage
```typescript
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
```

### Annotations
```typescript
// component Pagination
@Component({
  selector: 'pagination[ngModel]',
  template: PAGINATION_TEMPLATE,
  directives: [NgClass, NgFor]
})
export class Pagination implements ControlValueAccessor, OnInit, IPaginationConfig, IAttribute {
  @Input() public maxSize:number;

  @Input() public boundaryLinks:boolean;
  @Input() public directionLinks:boolean;
  // labels
  @Input() public firstText:string;
  @Input() public previousText:string;
  @Input() public nextText:string;
  @Input() public lastText:string;
  @Input() public rotate:boolean;

  @Input() private disabled:boolean;
  @Input() public get itemsPerPage():number {}
  @Input() private get totalItems():number {}

  @Output() private numPages:EventEmitter<number> = new EventEmitter(false);
  @Output() private pageChanged:EventEmitter<IPageChangedEvent> = new EventEmitter(false);

@Component({
  selector: 'pager[ngModel]',
  inputs: [
    'align',
    'totalItems', 'itemsPerPage',
    'previousText', 'nextText',
  ],
  outputs:['numPages', 'pageChanged'],
  template: PAGER_TEMPLATE,
  directives: [NgClass]
})
export class Pager extends Pagination {}

export const PAGINATION_DIRECTIVES:Array<any> = [Pagination, Pager];
```
### Pagination properties
  - `rotate` (`?boolean=true`) - if `true` current page will in the middle of pages list
  - `disabled` (`?boolean=false`) - if `true` pagination component will be disabled
  - `totalItems` (`number`) - total number of items in all pages
  - `itemsPerPage` (`?number=10`) - maximum number of items per page. If value less than 1 will display all items on one page
  - `maxSize` (`?number=undefined`) - limit number for page links in pager
  - `boundaryLinks` (`?boolean=true`) - if `false` first and last buttons will be hidden
  - `directionLinks` (`?boolean=true`) - if `false` previous and next buttons will be hidden
  - `previousText` (`?string='Previous'`) - previous button text
  - `nextText` (`?string='Next'`) - next button text
  - `firstText` (`?string='First'`) - first button text
  - `lastText` (`?string='Last'`) - last button text

### Pagination events
  - `numPages` - fired when total pages count changes, `$event:number` equals to total pages count
  - `pageChanged` - fired when page was changed, `$event:{page, itemsPerPage}` equals to object with current page index and number of items per page

### Pager properties
  - `align` (`?boolean=true`) - if `true` aligns each link to the sides of pager
  - `disabled` (`?boolean=false`) - if `true` pagination component will be disabled
  - `totalItems` (`number`) - total number of items in all pages
  - `itemsPerPage` (`?number=10`) - maximum number of items per page. If value less than 1 will display all items on one page
  - `previousText` (`?string='Previous'`) - previous button text
  - `nextText` (`?string='Next'`) - next button text

### Pager events
  - `numPages` - fired when total pages count changes, `$event:number` equals to total pages count
  - `pageChanged` - fired when page was changed, `$event:{page, itemsPerPage}` equals to object with current page index and number of items per page
