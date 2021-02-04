// RECOMMENDED
import { RatingModule } from 'ngx-bootstrap/rating';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { RatingModule } from 'ngx-bootstrap';

@NgModule({
  imports: [RatingModule.forRoot(),...]
})
export class AppModule(){}
