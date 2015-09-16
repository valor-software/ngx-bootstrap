### Usage
```typescript
import {ButtonRadio, ButtonCheckbox} from 'ng2-bootstrap';
```
### Annotations
```typescript
// class ButtonRadio implements OnInit
@Directive({
  selector: '[btn-radio][ng-model]',
  properties: ['btnRadio', 'uncheckable'],
  host: {
    '(click)': 'onClick()',
    '[class.active]': 'isActive'
  },
})

// class ButtonCheckbox implements OnInit
@Directive({
  selector: '[btn-checkbox][ng-model]',
  properties: ['btnCheckboxTrue', 'btnCheckboxFalse'],
  host: {
    '(click)': 'onClick()',
    '[class.active]': 'state'
  },
})
```

### Radio button properties
  - `btn-radio` (`string`) - radio button value, will be set to `ng-model`
  - `uncheckable` (`?boolean=false`) - if `true` radio button can be unchecked and `null` will be set to `ng-model`

### Checkbox button properties
  - `btn-checkbox-true` (`?any=true`) - truthy value
  - `btn-checkbox-false` (`?any=false`) - falsy value
