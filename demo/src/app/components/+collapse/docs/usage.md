import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RECOMMENDED
import { CollapseModule } from 'ngx-bootstrap/collapse';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ...
  ]
})
export class AppModule(){}

Also should be added web-animations-js polyfill for IE browser (Edge)
