// RECOMMENDED
import { ModalModule } from 'ngx-bootstrap/modal';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [ModalModule.forRoot(),...]
})
export class AppModule(){}
