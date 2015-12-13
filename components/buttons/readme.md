### Usage
```typescript
import { ButtonRadio, ButtonCheckbox } from 'ng2-bootstrap/ng2-bootstrap';
```
### Annotations
```typescript
// class ButtonRadio implements OnInit
@Directive({ selector: '[btnRadio][ngModel]' })
export class ButtonRadio implements ControlValueAccessor, OnInit {
  @Input() public btnRadio:string;
  @Input() public uncheckable:boolean;

  @HostBinding('class.active')
  private get isActive() {}

  @HostListener('click')
  private onClick() {}
}
// class ButtonCheckbox implements OnInit
@Directive({ selector: '[btnCheckbox][ngModel]' })
export class ButtonCheckbox implements ControlValueAccessor, OnInit {
  @Input() private btnCheckboxTrue:any;
  @Input() private btnCheckboxFalse:any;

  @HostBinding('class.active')
  private state:boolean = false;

  @HostListener('click')
  private onClick() {}
}
```

### Radio button properties
  - `btn-radio` (`string`) - radio button value, will be set to `ng-model`
  - `uncheckable` (`?boolean=false`) - if `true` radio button can be unchecked and `null` will be set to `ng-model`

### Checkbox button properties
  - `btn-checkbox-true` (`?any=true`) - truthy value
  - `btn-checkbox-false` (`?any=false`) - falsy value
