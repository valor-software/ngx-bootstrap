```typescript
// RECOMMENDED (doesn't work with system.js)
import { CarouselModule } from 'ngx-bootstrap/carousel';
// or
import { CarouselModule } from 'ngx-bootstrap';

@NgModule({
  imports: [CarouselModule.forRoot(),...]
})
export class AppModule(){} 
```
