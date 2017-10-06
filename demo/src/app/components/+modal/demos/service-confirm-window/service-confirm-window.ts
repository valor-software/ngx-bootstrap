import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'demo-modal-service-confirm-window',
  templateUrl: './service-confirm-window.html'
})
export class DemoModalServiceConfirmWindowComponent {
  modalRef: BsModalRef;
  message: string
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.message = "Confirmed!";
    this.modalRef.hide()
  }

  decline(): void {
    this.message = "Declined!";
    this.modalRef.hide()
  }
}
