// RECOMMENDED
import { SortableModule } from 'ngx-bootstrap/sortable';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { SortableModule } from 'ngx-bootstrap';

@NgModule({
  imports: [SortableModule.forRoot(),...]
})
export class AppModule(){}
