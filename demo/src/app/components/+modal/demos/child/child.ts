import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-modal-child',
  templateUrl: './child.html'
})
export class DemoModalChildComponent {
  @ViewChild('childModal') childModal: ModalDirective;

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
}
