import { Injectable } from '@angular/core';

@Injectable()
export class TooltipConfig {
  public placement:string = 'top';
  public triggers:string = 'hover focus';
  public container: string;
}
