import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RECOMMENDED
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
// or
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    ...
  ]
})
export class AppModule(){}
