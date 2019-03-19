import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-modal-service-custom-css-class',
  templateUrl: './custom-css-class.html'
})
export class DemoModalServiceCustomCSSClassComponent {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
