import { Injectable } from '@angular/core';
/** @deprecated */
@Injectable()
export class TooltipOptions {
  public placement:string;
  public popupClass:string;
  public animation:boolean;
  public appendToBody:boolean;
  public isOpen:boolean;
  public content:string;
  public htmlContent:any;
  public context:any;
  public trigger: string[]|string;

  public constructor(options:Object) {
    Object.assign(this, options);
  }
}
