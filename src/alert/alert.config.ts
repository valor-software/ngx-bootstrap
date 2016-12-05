import { Injectable } from '@angular/core';

@Injectable()
export class AlertConfig {
  /** default alert type */
  public type: string = 'warning';

  /** is alerts dismissible by default */
  public dismissible: boolean = false;

  /** default time before alert dismiss */
  public dismissOnTimeout?: number = undefined;
}
