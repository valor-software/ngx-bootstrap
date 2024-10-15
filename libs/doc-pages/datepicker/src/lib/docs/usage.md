### Standalone component usage
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Components({
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule,
    ...
  ]
})
export class AppComponents(){}


### Module usage
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule,
    ...
  ]
})
export class AppModule(){}
