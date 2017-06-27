```typescript
// RECOMMENDED (doesn't work with system.js)
import { RatingModule } from 'ngx-bootstrap/rating';
// or
import { RatingModule } from 'ngx-bootstrap';

@NgModule({
  imports: [RatingModule.forRoot(),...]
})
export class AppModule(){} 
```
