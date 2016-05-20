import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// todo: change to ng2-bootstrap
import {MODAL_DIRECTVES} from '../../../ng2-bootstrap';
// webpack html imports
let template = require('./modal-demo.html');

@Component({
  selector: 'modal-demo',
  template: template,
  directives: [MODAL_DIRECTVES, CORE_DIRECTIVES]
})
export class ModalDemoComponent {

}
