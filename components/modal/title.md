Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.

Base specifications: [bootstrap 3](http://getbootstrap.com/javascript/#modals) or [bootstrap 4](http://v4-alpha.getbootstrap.com/components/modal/)

### **Important notes**:
- Don't forget to add `hack` to your application root component ([why?](https://github.com/angular/angular/issues/6446#issuecomment-173459525))

```typescript
import { Component, ViewContainerRef } from '@angular/core';

@Component({selector:'app-root'})
class AppRoot {
  private viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef:ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
}
```
