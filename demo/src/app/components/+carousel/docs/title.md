```typescript
// RECOMMENDED (doesn't work with system.js)
import { CarouselModule } from 'ng2-bootstrap/carousel';
// or
import { CarouselModule } from 'ng2-bootstrap';

@NgModule({
  imports: [CarouselModule.forRoot(),...]
})
export class AppModule(){} 
```
