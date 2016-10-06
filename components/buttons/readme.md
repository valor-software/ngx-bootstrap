### Usage
```typescript
import { ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { ButtonsModule } from 'ng2-bootstrap/components/buttons';
```
### Annotations
```typescript
// directive ButtonRadio
@Directive({ selector: '[btnRadio][ngModel]' })
export class ButtonRadioDirective implements ControlValueAccessor, OnInit {
  @Input() public btnRadio:string;
  @Input() public uncheckable:boolean;

  @HostBinding('class.active')
  public get isActive() {}

  @HostListener('click')
  public onClick() {}
}
// directive ButtonCheckbox
@Directive({ selector: '[btnCheckbox][ngModel]' })
export class ButtonCheckboxDirective implements ControlValueAccessor, OnInit {
  @Input() public btnCheckboxTrue:any;
  @Input() public btnCheckboxFalse:any;

  @HostBinding('class.active')
  public state:boolean = false;

  @HostListener('click')
  public onClick() {}
}
```

### Radio button properties
  - `btnRadio` (`string`) - radio button value, will be set to `ngModel`
  - `uncheckable` (`?boolean=false`) - if `true` radio button can be unchecked

### Checkbox button properties
  - `btnCheckboxTrue` (`?any=true`) - truthy value, will be set to `ngModel`
  - `btnCheckboxFalse` (`?any=false`) - falsy value, will be set to `ngModel`
