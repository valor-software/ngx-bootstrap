import { ElementRef } from '@angular/core';

export interface ListenOptions {
  target?: ElementRef | HTMLElement;
  triggers?: string;
  outsideClick?: boolean;
  show?: Function;
  hide?: Function;
  toggle?: Function;
}
