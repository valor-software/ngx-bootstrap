### Standalone component usage
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/datepicker';

@Components({
  standalone: true,
  imports: [
    BrowserAnimationsModule,
    BsDropdownModule,
    ...
  ]
})
export class AppComponents(){}


### Module usage
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BsDropdownModule
  ]
})
export class AppModule(){}

Also should be added web-animations-js polyfill for IE browser (Edge)
