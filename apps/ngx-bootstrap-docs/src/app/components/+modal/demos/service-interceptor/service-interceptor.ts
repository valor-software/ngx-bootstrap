import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-modal-service-interceptor',
  templateUrl: './service-interceptor.html'
})
export class DemoModalServiceWithInterceptorComponent {
  bsModalRef: BsModalRef;

  confirmModalRef: BsModalRef;
  confirmResolve: Function;
  confirmReject: Function;
  confirmPromise: Promise<void>;

  constructor(private modalService: BsModalService) {}

  openModalWithInterceptor(confirmTemplate: TemplateRef<any>) {
    const closeInterceptor = () => {
      this.confirmPromise = new Promise((resolve, reject) => {
        this.confirmResolve = resolve;
        this.confirmReject = reject;
      });
      this.confirmModalRef = this.modalService.show(confirmTemplate, {class: 'modal-sm'});

      return this.confirmPromise;
    };
    this.bsModalRef = this.modalService.show(ModalContentWithInterceptorComponent, { closeInterceptor });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  confirm(): void {
    this.confirmResolve();
    this.confirmModalRef.hide();
  }

  decline(): void {
    this.confirmReject();
    this.confirmModalRef.hide();
  }
}

@Component({
  selector: 'modal-content-with-interceptor',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Modal with interceptor</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">This modal has closing interceptor</div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
    </div>
  `
})

export class ModalContentWithInterceptorComponent {
  constructor(public bsModalRef: BsModalRef) { }
}
