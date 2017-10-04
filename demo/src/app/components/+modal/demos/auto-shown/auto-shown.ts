import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-modal-auto-shown',
  templateUrl: './auto-shown.html'
})
export class DemoAutoShownModalComponent {
  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShown: boolean = false;

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }
}
