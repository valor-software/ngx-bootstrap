### Standalone component usage
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  standalone: true,
  imports: [ModalModule,...], // module can be optional
  providers: [BsModalService]
})
export class AppComponent(){}

### Module usage
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [ModalModule,...],
  providers: [BsModalService]
})
export class AppModule(){}
