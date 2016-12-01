### Usage
```typescript
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { PaginationModule } from 'ng2-bootstrap/components/pagination';
```

### Annotations
```typescript
// component Pagination
@Component({
  selector: 'pagination[ngModel]',
  template: PAGINATION_TEMPLATE
})
export class PaginationComponent implements ControlValueAccessor, OnInit, IPaginationConfig, IAttribute {
  @Input() public maxSize:number;

  @Input() public boundaryLinks:boolean;
  @Input() public directionLinks:boolean;
  // labels
  @Input() public firstText:string;
  @Input() public previousText:string;
  @Input() public nextText:string;
  @Input() public lastText:string;
  @Input() public rotate:boolean;
  // css
  @Input() public pageBtnClass: string;

  @Input() public disabled:boolean;
  @Input() public get itemsPerPage():number {}
  @Input() public get totalItems():number {}

  @Output() public numPages:EventEmitter<number> = new EventEmitter(false);
  @Output() public pageChanged:EventEmitter<IPageChangedEvent> = new EventEmitter(false);

@Component({
  selector: 'pager[ngModel]',
  template: PAGER_TEMPLATE
})
export class PagerComponent extends Pagination {}
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
  - `pageBtnClass` (`?string=''`) - add class to `<li>`

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
  - `pageBtnClass` (`?string=''`) - add class to `<li>`

### Pager events
  - `numPages` - fired when total pages count changes, `$event:number` equals to total pages count
  - `pageChanged` - fired when page was changed, `$event:{page, itemsPerPage}` equals to object with current page index and number of items per page
