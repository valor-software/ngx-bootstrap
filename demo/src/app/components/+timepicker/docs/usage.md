// RECOMMENDED
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
// NOT RECOMMENDED (Angular 9 doesn't support this form of import)
import { TimepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [TimepickerModule.forRoot(),...]
})
export class AppModule(){}
