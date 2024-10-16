### Standalone component usage
import { TooltipModule } from 'ngx-bootstrap/timepicker';

@Component({
  standalone: true,
  imports: [TooltipModule,...]
})
export class AppComponent(){}

### Module usage
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [TooltipModule,...]
})
export class AppModule(){}
