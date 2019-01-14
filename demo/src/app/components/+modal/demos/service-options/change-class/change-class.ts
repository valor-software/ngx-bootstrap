import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'demo-modal-change-class',
  templateUrl: './change-class.html'
})
export class DemoModalServiceChangeClassComponent {
  modalRef: BsModalRef;
  valueWidth = false;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-sm' })
    );
  }

  setModalClass() {
    this.valueWidth = !this.valueWidth;
    const modalWidth = this.valueWidth ? 'modal-lg' : 'modal-sm';
    this.modalRef.setClass(modalWidth);
  }
}
