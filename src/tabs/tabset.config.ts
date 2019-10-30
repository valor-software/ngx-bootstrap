import { Injectable } from '@angular/core';

@Injectable()
export class TabsetConfig {
  /** provides default navigation context class: 'tabs' or 'pills' */
  type = 'tabs';

  /** provides possibility to set keyNavigations enable or disable, by default is enable */
  isKeysAllowed = true;
}
