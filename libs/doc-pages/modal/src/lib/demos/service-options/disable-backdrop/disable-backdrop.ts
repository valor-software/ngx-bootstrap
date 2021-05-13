import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-modal-service-disable-backdrop',
  templateUrl: './disable-backdrop.html'
})
export class DemoModalServiceDisableBackdropComponent {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
}
