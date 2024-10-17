### Standalone component usage
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseDirective } from 'ngx-bootstrap/collapse';

@Component({
  imports: [
    BrowserAnimationsModule,
    CollapseDirective,
    ...
  ]
})
export class AppComponent(){}


### Module usage
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CollapseModule,
    ...
  ]
})
export class AppModule(){}

Also should be added web-animations-js polyfill for IE browser (Edge)
