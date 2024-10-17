### Standalone component usage
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  standalone: true,
  imports: [TabsModule,...]
})
export class AppComponent(){}

### Module usage
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [TabsModule,...]
})
export class AppModule(){}
