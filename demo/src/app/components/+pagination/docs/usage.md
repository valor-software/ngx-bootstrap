// RECOMMENDED
import { PaginationModule } from 'ngx-bootstrap/pagination';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  imports: [PaginationModule.forRoot(),...]
})
export class AppModule(){}
