// RECOMMENDED
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { ProgressbarModule } from 'ngx-bootstrap';

@NgModule({
  imports: [ProgressbarModule.forRoot(),...]
})
export class AppModule(){}
