import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RECOMMENDED
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
// NOT RECOMMENDED (Angular 9 doesn't support this form of import)
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    ...
  ]
})
export class AppModule(){}
