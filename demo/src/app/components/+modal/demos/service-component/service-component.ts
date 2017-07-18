import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'demo-modal-service-component',
  templateUrl: './service-component.html'
})
export class DemoModalServiceFromComponent {
  constructor(private modalService: BsModalService) {}

  public openModalWithComponent() {
    this.modalService.show(ModalContentComponent);
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
  public title: string = 'Modal with component';
  constructor(public bsModalRef: BsModalRef) {}
}
