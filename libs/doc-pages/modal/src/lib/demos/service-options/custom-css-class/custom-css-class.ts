import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-modal-service-custom-css-class',
  templateUrl: './custom-css-class.html',
  standalone: false
})
export class DemoModalServiceCustomCSSClassComponent {
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModalWithClass(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
  }
}
