import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

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
