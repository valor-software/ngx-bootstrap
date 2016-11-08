import { Injectable } from '@angular/core';

@Injectable()
export class TooltipConfig {
  public tooltipTrigger: string|Array<string> = ['mouseenter', 'focusin'];
}
