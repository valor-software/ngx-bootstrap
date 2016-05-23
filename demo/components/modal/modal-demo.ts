import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// todo: change to ng2-bootstrap
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from '../../../ng2-bootstrap';
// webpack html imports
let template = require('./modal-demo.html');

@Component({
  selector: 'modal-demo',
  directives: [MODAL_DIRECTVES, CORE_DIRECTIVES],
  viewProviders:[BS_VIEW_PROVIDERS],
  template: template
})
export class ModalDemoComponent {

}
