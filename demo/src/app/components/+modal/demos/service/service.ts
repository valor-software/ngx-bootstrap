import { Component, ElementRef, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'demo-modal-service',
  templateUrl: './service.html'
})
export class DemoModalServiceComponent {
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {
  }
  public openModal(template: string | TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
  public openModalWithComponent() {
    this.modalService.show(ModalContentComponent, {class: 'modal-lg gray'});
  }
}

/* This is a component which we pass in modal*/

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      This is a modal with component inside.
      Click <b>&times;</b> to close modal.
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
    </div>
  `
})
export class ModalContentComponent {
  public title: string = 'Modal with component and class';
  constructor(public bsModalRef: BsModalRef) {}
}
