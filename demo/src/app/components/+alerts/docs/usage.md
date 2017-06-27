```typescript
// RECOMMENDED (doesn't work with system.js)
import { AlertModule } from 'ngx-bootstrap/alert';
// or
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  imports: [AlertModule.forRoot(),...]
})
export class AppModule(){} 
```
