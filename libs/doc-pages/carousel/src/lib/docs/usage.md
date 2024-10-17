### Standalone component usage
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  imports: [
    CarouselModule,
    ...
]
})
export class AppComponent(){}


### Module usage
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  imports: [CarouselModule,...]
})
export class AppModule(){}
