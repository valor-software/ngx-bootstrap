import { Injectable } from '@angular/core';

@Injectable()
export class TooltipOptions {
  public placement:string;
  public popupClass:string;
  public animation:boolean;
  public isOpen:boolean;
  public content:string;
  public htmlContent:any;
  public context:any;

  public constructor(options:Object) {
    Object.assign(this, options);
  }
}
