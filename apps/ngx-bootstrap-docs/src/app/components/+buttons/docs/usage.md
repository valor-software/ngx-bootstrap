// RECOMMENDED
import { ButtonsModule } from 'ngx-bootstrap/buttons';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { ButtonsModule } from 'ngx-bootstrap';

@NgModule({
  imports: [ButtonsModule.forRoot(),...]
})
export class AppModule(){}
