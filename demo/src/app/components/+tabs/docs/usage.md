// RECOMMENDED (doesn't work with system.js)
import { TabsModule } from 'ngx-bootstrap/tabs';
// or
import { TabsModule } from 'ngx-bootstrap';

@NgModule({
  imports: [TabsModule.forRoot(),...]
})
export class AppModule(){}
