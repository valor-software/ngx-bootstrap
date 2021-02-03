import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RECOMMENDED
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    ...
  ]
})
export class AppModule(){}
