import { Injectable } from '@angular/core';

@Injectable()
export class AlertConfig {
  /** default alert type */
  type = 'warning';

  /** is alerts are dismissible by default */
  dismissible = false;

  /** default time before alert will dismiss */
  dismissOnTimeout?: number = undefined;
}
