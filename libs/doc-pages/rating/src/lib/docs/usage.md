### Standalone component usage
import { RatingModule } from 'ngx-bootstrap/rating';

@Component({
  standalone: true,
  imports: [RatingModule,...]
})
export class AppComponent(){}

### Module usage
import { RatingModule } from 'ngx-bootstrap/rating';

@NgModule({
  imports: [RatingModule,...]
})
export class AppModule(){}
