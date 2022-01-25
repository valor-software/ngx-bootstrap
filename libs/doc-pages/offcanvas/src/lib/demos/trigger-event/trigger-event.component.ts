import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'trigger-event',
  templateUrl: './trigger-event.component.html'
})
export class TriggerEventComponent {
  triggeredEvent?: boolean;

  triggerEvent(value: boolean) {
    this.triggeredEvent = value;
  }
}
