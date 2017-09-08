import { isDevMode } from '@angular/core';
const _messagesHash: { [key: string]: boolean } = {};
const _hideMsg = typeof console === 'undefined' || !console.warn;

export function warnOnce(msg: string): void {
  if (!isDevMode() || _hideMsg || msg in _messagesHash) {
    return;
  }

  _messagesHash[msg] = true;
  /*tslint:disable-next-line*/
  console.warn(msg);
}
