/**
 * Determines if the browser is Internet Explorer
 */
import { isBrowser } from './isBrowser';

const documentRef: any = document;
const windowRef: any = window;

const isIE11 = isBrowser && !!(windowRef.MSInputMethodContext && documentRef.documentMode);
const isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

export function isIE(version?: number) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }

  return isIE11 || isIE10;
}
