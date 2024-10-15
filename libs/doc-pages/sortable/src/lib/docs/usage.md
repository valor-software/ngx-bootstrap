### Standalone component usage
import { SortableModule } from 'ngx-bootstrap/sortable';

@Component({
  standalone: true,
  imports: [SortableModule,...]
})
export class AppComponent(){}

### Module usage
import { SortableModule } from 'ngx-bootstrap/sortable';

@NgModule({
  imports: [SortableModule,...]
})
export class AppModule(){}
