import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-modal-service-static',
  templateUrl: './service-template.html'
})
export class DemoModalServiceStaticComponent {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
