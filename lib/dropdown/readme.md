### Usage
```typescript
import {dropdown} from 'ng2-bootstrap';
```

```html
<!-- dropdown directive marks a dropdown root element -->
<div dropdown>
  <!-- click on dropdown-toggle toogles dropdown state, optional -->
  <div dropdown-toggle></div>
  <!-- dropdown-menu holds content which will be shown -->
  <div dropdown-menu>
    <!-- this content will be shown if dropdown opened -->
  </div>
</div>
```

### Annotations
```typescript
// class Dropdown implements OnInit, OnDestroy
@Directive({
  selector: '[dropdown]',
  properties: ['isOpen', 'autoClose', 'keyboardNav', 'dropdownAppendToBody'],
  events: ['onToggle'],
  host: {
    '[class.dropdown]': 'true',
    '[class.open]': 'isOpen'
  }
})

// class DropdownToggle implements OnInit
@Directive({
  selector: '[dropdown-toggle]',
  properties: ['disabled'],
  host: {
    '(click)': 'toggleDropdown($event)',
    '[class.dropdown-toggle]': 'true',
    '[class.disabled]': 'disabled',
    '[attr.aria-haspopup]': 'true',
    '[attr.aria-expanded]': 'isOpen'
  },
})

// class DropdownMenu implements OnInit
@Directive({
  selector: '[dropdown-menu], .dropdown-menu',
  properties: ['templateUrl'],
})

export const dropdown: Array<any> = [Dropdown, DropdownMenu, DropdownToggle];
```

### Dropdown properties
- `is-open` (`?boolean=false`) - if `true` dropdown will be opened
- `auto-close` (`?string='always'`) - behaviour vary:
    * `always` - (default) automatically closes the dropdown when any of its elements is clicked
    * `outsideClick` - closes the dropdown automatically only when the user clicks any element outside the dropdown
    * `disabled` - disables the auto close. You can then control the open/close status of the dropdown manually, by using `is-open`. Please notice that the dropdown will still close if the toggle is clicked, the `esc` key is pressed or another dropdown is open
- `keyboard-nav` (`?boolean=false`) - if `true` will enable navigation of dropdown list elements with the arrow keys
- `dropdown-append-to-body` (*not yet tested*) (`?boolean=false`) - if `true` `dropdown-menu` content will be appended to the body. This is useful when the dropdown button is inside a div with `overflow: hidden`, and the menu would otherwise be hidden

### Dropdown events
- `on-toggle` - fired when `dropdown` toggles, `$event:boolean` equals dropdown `is-open` state

### Dropdown toggle properties
- `disabled` (`?boolean=false`) - if `true` dropdown toggle will be disabled

### Dropdown menu properties
- `template-url` (*not yet supported*) - allows to provide dropdown menu template
