import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsetConfig {
  /** provides default navigation context class: 'tabs' or 'pills' */
  type: WritableSignal<string> = signal('tabs');
  /** provides possibility to set keyNavigations enable or disable, by default is enable */
  isKeysAllowed: WritableSignal<boolean> = signal(true);
  /** aria label for tab list */
  ariaLabel: WritableSignal<string> = signal('Tabs');
}
