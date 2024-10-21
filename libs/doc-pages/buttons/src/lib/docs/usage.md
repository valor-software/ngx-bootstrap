### Standalone component usage
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  imports: [
    ButtonsModule,
    ...
  ]
})
export class AppComponent(){}


### Module usage
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  imports: [ButtonsModule,...]
})
export class AppModule(){}
