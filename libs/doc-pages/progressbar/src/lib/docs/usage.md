### Standalone component usage
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@Component({
  standalone: true,
  imports: [ProgressbarModule,...]
})
export class AppComponent(){}

### Module usage
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  imports: [ProgressbarModule,...]
})
export class AppModule(){}
