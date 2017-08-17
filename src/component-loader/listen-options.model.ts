import { ElementRef } from '@angular/core';

export interface ListenOptions {
  target?: ElementRef;
  triggers?: string;
  outsideClick?: boolean;
  show?: Function;
  hide?: Function;
  toggle?: Function;
}
