import { ElementRef, Injectable } from '@angular/core';

export interface TooltipOptions {
  placement:string;
  popupClass:string;
  animation:boolean;
  isOpen:boolean;
  content:string;
  htmlContent:any;
  context:any;
  hostEl:ElementRef;
}

@Injectable()
export class TooltipOptions {
  public constructor(options:Object) {
    Object.assign(this, options);
  }
}
