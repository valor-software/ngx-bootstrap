// RECOMMENDED
import { AlertModule } from 'ngx-bootstrap/alert';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  imports: [AlertModule.forRoot(),...]
})
export class AppModule(){}
