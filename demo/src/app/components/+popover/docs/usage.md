// RECOMMENDED
import { PopoverModule } from 'ngx-bootstrap/popover';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { PopoverModule } from 'ngx-bootstrap';

@NgModule({
  imports: [PopoverModule.forRoot(),...]
})
export class AppModule(){}
