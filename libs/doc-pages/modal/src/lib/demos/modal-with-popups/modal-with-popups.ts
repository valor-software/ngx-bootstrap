import { Component, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-modal-with-popups',
  templateUrl: './modal-with-popups.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoModalWithPopupsComponent {
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
