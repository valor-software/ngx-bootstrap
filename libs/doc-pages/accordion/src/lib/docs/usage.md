### Standalone component usage
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionComponent, AccordionPanelComponent } from 'ngx-bootstrap/accordion';

@Component({
  standalone: true,
  imports: [
    BrowserAnimationsModule,
    AccordionComponent,
    AccordionPanelComponent
    ...
  ]
})
export class AppComponent(){}

Also should be added web-animations-js polyfill for IE browser (Edge)
### Module usage
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AccordionModule,
    ...
  ]
})
export class AppModule(){}

Also should be added web-animations-js polyfill for IE browser (Edge)
