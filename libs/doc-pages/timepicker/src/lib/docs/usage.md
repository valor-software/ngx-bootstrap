### Standalone component usage
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

@Component({
  standalone: true,
  imports: [TimepickerModule,...]
})
export class AppComponent(){}

### Module usage
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

@NgModule({
  imports: [TimepickerModule,...]
})
export class AppModule(){}
