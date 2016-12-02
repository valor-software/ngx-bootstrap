import { Injectable } from '@angular/core';

@Injectable()
export class AlertConfig {
  public dismissible: boolean = false;
  public type: string = 'warning';
  public dismissOnTimeout?: number = undefined;
}
