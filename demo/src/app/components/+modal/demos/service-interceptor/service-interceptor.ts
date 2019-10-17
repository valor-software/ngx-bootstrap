import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-modal-service-interceptor',
  templateUrl: './service-interceptor.html'
})
export class DemoModalServiceWithInterceptorComponent {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModalWithInterceptor() {
    const closeInterceptors = [
      () => {
        if (confirm(`Do you really want to close?`)) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      }
    ];
    this.bsModalRef = this.modalService.show(ModalContentWithInterceptorComponent, { closeInterceptors });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}

@Component({
  selector: 'modal-content-with-interceptor',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Modal with interceptors</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">This modal has closing interceptors</div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
    </div>
  `
})

export class ModalContentWithInterceptorComponent {
  constructor(public bsModalRef: BsModalRef) { }
}
