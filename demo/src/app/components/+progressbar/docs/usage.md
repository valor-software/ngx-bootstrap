// RECOMMENDED
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
// NOT RECOMMENDED (Angular 9 doesn't support this form of import)
import { ProgressbarModule } from 'ngx-bootstrap';

@NgModule({
  imports: [ProgressbarModule.forRoot(),...]
})
export class AppModule(){}
