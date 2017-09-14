import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'demo-modal-service-nested',
  templateUrl: './service-nested.html'
})
export class DemoModalServiceNestedComponent {
  public modalRef: BsModalRef;
  public modalRef2: BsModalRef;
  constructor(private modalService: BsModalService) {}

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  public openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'second' });
  }
  public closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }
}
