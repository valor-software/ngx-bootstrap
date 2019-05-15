import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RECOMMENDED
import { CollapseModule } from 'ngx-bootstrap/collapse';
// or
import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ...
  ]
})
export class AppModule(){}
