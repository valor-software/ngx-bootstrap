// RECOMMENDED
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
// NOT RECOMMENDED (Angular 9 doesn't support this form of import)
import { DatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [DatepickerModule.forRoot(),...]
})
export class AppModule(){}
