Provides contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

This directive can be used to generate alerts from the dynamic model data (using the `ng-for` directive).

### Usage
```typescript
// RECOMMENDED
import { AlertModule } from 'ng2-bootstrap/alert';
// or
import { AlertModule } from 'ng2-bootstrap';

@NgModule({
  imports: [AlertModule.forRoot(),...]
})
export class AppModule(){} 
```
