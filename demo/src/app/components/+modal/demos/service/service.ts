import { Component, ElementRef, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
// import { ModalContentComponent } from './modal-content.component';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'demo-modal-service',
  templateUrl: './service.html'
})
export class DemoModalServiceComponent {
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private element: ElementRef, private renderer: Renderer, private vcRef: ViewContainerRef) {
    this.modalService = this.modalService.create(this.element, this.vcRef, this.renderer);
  }
  public openModal(template: string | TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
  public openModalWithComponent() {
    this.modalRef = this.modalService.show(ModalContentComponent);
  }
}

/* This is a component which we pass in modal*/

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
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
      </div>
    </div>
  `
})
export class ModalContentComponent {
  public title: string = 'Modal with component';
  constructor(public bsModalRef: BsModalRef) {}
}
