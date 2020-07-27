// RECOMMENDED
import { TabsModule } from 'ngx-bootstrap/tabs';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { TabsModule } from 'ngx-bootstrap';

@NgModule({
  imports: [TabsModule.forRoot(),...]
})
export class AppModule(){}
