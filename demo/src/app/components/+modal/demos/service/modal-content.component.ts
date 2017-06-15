import { Component } from '@angular/core';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title pull-left">Modal with component</h4>
          <button type="button" class="close pull-right" aria-label="Close" data-bsmodal-close="true">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          This is a modal with component inside.
          Click <b>&times;</b> to close modal.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-bsmodal-close="true">Close</button>
        </div>
      </div>
    </div>
  `
})
export class ModalContentComponent {

}
