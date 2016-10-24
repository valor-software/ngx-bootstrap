import { Injectable } from '@angular/core';

import { TooltipOptions } from '../tooltip/tooltip-options.class';

export interface PopoverOptions extends TooltipOptions {
  title: string;
}

@Injectable()
export class PopoverOptions extends TooltipOptions {
  public constructor(options: PopoverOptions) {
    super(options);
  }
}
