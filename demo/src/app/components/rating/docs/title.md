```typescript
// RECOMMENDED (doesn't work with system.js)
import { RatingModule } from 'ng2-bootstrap/rating';
// or
import { RatingModule } from 'ng2-bootstrap';

@NgModule({
  imports: [RatingModule.forRoot(),...]
})
export class AppModule(){} 
```
