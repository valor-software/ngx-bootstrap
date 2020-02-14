import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RECOMMENDED
import { AccordionModule } from 'ngx-bootstrap/accordion';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
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
