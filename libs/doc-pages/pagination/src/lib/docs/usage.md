### Standalone component usage
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  standalone: true,
  imports: [PaginationModule,...],
})
export class AppComponent(){}

### Module usage
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [PaginationModule,...]
})
export class AppModule(){}
