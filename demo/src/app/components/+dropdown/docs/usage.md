import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RECOMMENDED
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// or
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ]
})
export class AppModule(){}

Also should be added web-animations-js polyfill for IE browser (Edge)
