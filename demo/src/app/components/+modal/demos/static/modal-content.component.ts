import { Component } from '@angular/core';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title pull-left">Static modal with component</h4>
          <button type="button" class="close pull-right" aria-label="Close" data-bsmodal-close="true">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          This is static modal, backdrop click will not close it.
          Click <b>&times;</b> to close modal.
        </div>
      </div>
    </div>
  `
})
export class ModalContentComponent {

}
