### Usage
```typescript
import { SortableModule } from 'ng2-bootstrap';
// or
import { SortableModule } from 'ng2-bootstrap/sortable';
```

### Annotations
```typescript
// component Sortable
@Component({
  selector: 'ng2-sortable'
})
export class SortableComponent {
  @Input() public fieldName: string;
  @Input() public placeholderItem: string;
  @Input() public wrapperClass: string;
  @Input() public wrapperStyle: {};
  @Input() public itemClass: string;
  @Input() public itemStyle: {};
  @Input() public itemActiveClass: string;
  @Input() public itemActiveStyle: {};
  @Input() public placeholderClass: string;
  @Input() public placeholderStyle: {};

  @Output() public onChange: EventEmitter<any[]>;
}
```

### Sortable properties
  - `ngModel` (`string[] | any[]`) - array of items to show
  - `fieldName` (`?string=''`) - field name if input array consists of objects
  - `placeholderItem` (`?string=''`) - placeholder item
  - `wrapperClass` (`?string=''`) - class name for items wrapper
  - `wrapperStyle` (`?any`) - style object for items wrapper
  - `itemClass` (`?string=''`) - class name for item
  - `itemStyle` (`?any`) - style object for item
  - `itemActiveClass` (`?string=''`) - class name for active item
  - `itemActiveStyle` (`?any`) - style object for active item
  - `placeholderClass` (`?string=''`) - class name for placeholder
  - `placeholderStyle` (`?any`) - style object for placeholder

### Sortable events
  - `onChange` - fired on array change (reordering, insert, remove)
