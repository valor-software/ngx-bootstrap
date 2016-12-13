Rating component that will take care of visualising a star rating bar

*Note*: Bootstrap 4 do not include glyphicons anymore, so if you want to continue use this font, you will need to add a link to [`glyphicons.css`](https://github.com/valor-software/ng2-bootstrap/blob/master/demo/assets/css/glyphicons.css)

### Usage
```typescript
// RECOMMENDED
import { RatingModule } from 'ng2-bootstrap/rating';
// or
import { RatingModule } from 'ng2-bootstrap';

@NgModule({
  imports: [RatingModule.forRoot(),...]
})
export class AppModule(){} 
```
