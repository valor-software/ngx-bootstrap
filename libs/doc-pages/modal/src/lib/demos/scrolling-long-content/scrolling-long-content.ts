import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-modal-scrolling-long-content',
  templateUrl: './scrolling-long-content.html',
  standalone: false
})
export class DemoModalScrollingLongContentComponent {
  modalRef?: BsModalRef;
  items: number[];

  constructor(private modalService: BsModalService) {
    this.items = Array(15).fill(0);
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
