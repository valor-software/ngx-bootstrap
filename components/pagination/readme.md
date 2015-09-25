### Usage
```typescript
import {pagination} from 'ng2-bootstrap';
```

### Annotations
```typescript
// class Pagination implements OnInit
@Component({
  selector: 'pagination[ng-model], [pagination][ng-model]',
  properties: [
    'rotate', 'disabled',
    'totalItems', 'itemsPerPage', 'maxSize',
    'boundaryLinks', 'directionLinks',
    'firstText', 'previousText', 'nextText', 'lastText'
  ],
  events: ['numPages', 'pageChanged'],
})

// class Pager implements OnInit
@Component({
  selector: 'pager[ng-model], [pager][ng-model]',
  properties: [
    'align',
    'totalItems', 'itemsPerPage',
    'previousText', 'nextText',
  ],
})

export const pagination:Array<any> = [Pagination, Pager];
```
### Pagination properties
  - `rotate` (`?boolean=true`) - if `true` current page will in the middle of pages list
  - `disabled` (`?boolean=false`) - if `true` pagination component will be disabled
  - `total-items` (`number`) - total number of items in all pages
  - `items-per-page` (`?number=10`) - maximum number of items per page. If value less than 1 will display all items on one page
  - `max-size` (`?number=undefined`) - limit number for page links in pager
  - `boundary-links` (`?boolean=true`) - if `false` first and last buttons will be hidden
  - `direction-links` (`?boolean=true`) - if `false` previous and next buttons will be hidden
  - `previous-text` (`?string='Previous'`) - previous button text
  - `next-text` (`?string='Next'`) - next button text
  - `first-text` (`?string='First'`) - first button text
  - `last-text` (`?string='Last'`) - last button text
  - `template-url`(*not yet supported*) (`?string`) - allows to override the template url of component (default: `components/pagination/pagination.html`)

### Pagination events
  - `num-pages` - fired when total pages count changes, `$event:number` equals to total pages count
  - `page-changed` - fired when page was changed, `$event:{page, itemsPerPage}` equals to object with current page index and number of items per page

### Pager properties
  - `align` (`?boolean=true`) - if `true` aligns each link to the sides of pager
  - `disabled` (`?boolean=false`) - if `true` pagination component will be disabled
  - `total-items` (`number`) - total number of items in all pages
  - `items-per-page` (`?number=10`) - maximum number of items per page. If value less than 1 will display all items on one page
  - `previous-text` (`?string='Previous'`) - previous button text
  - `next-text` (`?string='Next'`) - next button text
  - `template-url`(*not yet supported*) (`?string`) - allows to override the template url of component (default: `components/pagination/pager.html`)

### Pager events
  - `num-pages` - fired when total pages count changes, `$event:number` equals to total pages count
  - `page-changed` - fired when page was changed, `$event:{page, itemsPerPage}` equals to object with current page index and number of items per page
