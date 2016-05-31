### Usage
```typescript
import { MODAL_DIRECTVES } from 'ng2-bootstrap/ng2-bootstrap';
// or
import { MODAL_DIRECTVES } from 'ng2-bootstrap/components/modal';
```

### Annotations
```typescript
@Directive({
  selector: '[bsModal]',
  exportAs: 'bs-modal'
})
export class ModalDirective implements AfterViewInit, OnDestroy {
  @Input()
  public set config(conf:ModalOptions) {
    this._config = this.getConfig(conf);
  };

  @Output() public onShow:EventEmitter<ModalDirective> = new EventEmitter();
  @Output() public onShown:EventEmitter<ModalDirective> = new EventEmitter();
  @Output() public onHide:EventEmitter<ModalDirective> = new EventEmitter();
  @Output() public onHidden:EventEmitter<ModalDirective> = new EventEmitter();

}
```

### Modal properties
- `config` (`?:ModalOptions`) - modal configuration (default is: `backdrop:true,keyboard: true,focus: true,show: true`)

### Modal methods

- `show` - show modal
- `hide` - hides modal
- `toggle` - toggles modal visibility

### Modal events
- `onShow` - This event fires immediately when the `show` instance method is called.
- `onShown` - This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete)
- `onHide` - This event is fired immediately when the `hide` instance method has been called.
- `onHidden` - This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).
