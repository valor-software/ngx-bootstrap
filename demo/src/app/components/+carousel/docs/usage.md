// RECOMMENDED
import { CarouselModule } from 'ngx-bootstrap/carousel';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { CarouselModule } from 'ngx-bootstrap';

@NgModule({
  imports: [CarouselModule.forRoot(),...]
})
export class AppModule(){}
