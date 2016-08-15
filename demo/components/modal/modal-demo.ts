import {Component, ViewChild} from '@angular/core';

// todo: change to ng2-bootstrap
import {BS_VIEW_PROVIDERS} from '../../../ng2-bootstrap';
import {ModalDirective} from '../../../components/modal/modal.component';
// webpack html imports
let template = require('./modal-demo.html');

@Component({
  selector: 'modal-demo',
  viewProviders:[BS_VIEW_PROVIDERS],
  template: template
})
export class ModalDemoComponent {
  @ViewChild('childModal') public childModal: ModalDirective;

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }
}
