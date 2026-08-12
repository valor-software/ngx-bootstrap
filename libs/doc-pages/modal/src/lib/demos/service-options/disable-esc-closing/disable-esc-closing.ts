import { Component, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-modal-service-disable-esc-closing',
  templateUrl: './disable-esc-closing.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoModalServiceDisableEscClosingComponent {
  modalRef?: BsModalRef;
  config = {
    keyboard: true
  };
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
}
