import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-modal-events',
  templateUrl: './events.html'
})
export class DemoModalEventsComponent {
  @ViewChild(ModalDirective) public modal: ModalDirective;
  public messages: string[];

  public showModal() {
    this.messages = [];
    this.modal.show();
  }
  public handler(type: string, $event: ModalDirective) {
    this.messages.push(
      `event ${type} is fired${$event.dismissReason
        ? ', dismissed by ' + $event.dismissReason
        : ''}`
    );
  }
}
