### Usage
```typescript
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
// or
import { ButtonRadio, ButtonCheckbox } from 'ng2-bootstrap/ng2-bootstrap';
```
### Annotations
```typescript
// component ButtonRadio
@Directive({ selector: '[btnRadio][ngModel]' })
export class ButtonRadio implements ControlValueAccessor, OnInit {
  @Input() public btnRadio:string;
  @Input() public uncheckable:boolean;

  @HostBinding('class.active')
  private get isActive() {}

  @HostListener('click')
  private onClick() {}
}
// component ButtonCheckbox
@Directive({ selector: '[btnCheckbox][ngModel]' })
export class ButtonCheckbox implements ControlValueAccessor, OnInit {
  @Input() private btnCheckboxTrue:any;
  @Input() private btnCheckboxFalse:any;

  @HostBinding('class.active')
  private state:boolean = false;

  @HostListener('click')
  private onClick() {}
}

export const BUTTON_DIRECTIVES = [ButtonCheckbox, ButtonRadio];
```

### Radio button properties
  - `btnRadio` (`string`) - radio button value, will be set to `ngModel`
  - `uncheckable` (`?boolean=false`) - if `true` radio button can be unchecked and `null` will be set to `ngModel`

### Checkbox button properties
  - `btnCheckboxTrue` (`?any=true`) - truthy value, will be set to `ngModel`
  - `btnCheckboxFalse` (`?any=false`) - falsy value, will be set to `ngModel`
