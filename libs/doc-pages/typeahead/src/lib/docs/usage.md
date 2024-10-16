### Standalone component usage
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
@Component({
  standalone: true,
  imports: [
    BrowserAnimationsModule,
    TypeaheadModule,
    ...
  ]
})
export class AppComponent(){}

### Module usage
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    TypeaheadModule,
    ...
  ]
})
export class AppModule(){}
