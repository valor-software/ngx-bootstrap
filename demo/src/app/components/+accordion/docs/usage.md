import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RECOMMENDED
import { AccordionModule } from 'ngx-bootstrap/accordion';
// or
import { AccordionModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    ...
  ]
})
export class AppModule(){}

Also should be added web-animations-js polyfill for IE browser (Edge)
