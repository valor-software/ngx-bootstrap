### Standalone component usage
import { PopoverModule } from 'ngx-bootstrap/popover';

@Component({
  standalone: true,
  imports: [PopoverModule,...]
})
export class AppComponent(){}

### Module usage
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  imports: [PopoverModule,...]
})
export class AppModule(){}
