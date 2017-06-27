import { Component } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'demo-modal-events',
  templateUrl: './events.html'
})
export class DemoModalEventsComponent {
  public handler(type: string, $event: ModalDirective) {
    console.log(`event ${type} is fired${$event.dismissReason ? ', dismissed by ' + $event.dismissReason : ''}`);
  }
}
