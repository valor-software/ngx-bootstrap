### Standalone component usage
import { AlertComponent } from 'ngx-bootstrap/alert';

@Components({
  standalone: true,
  imports: [AlertComponent,...]
})
export class AppComponent(){}


### Module usage
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [AlertModule,...]
})
export class AppModule(){}
