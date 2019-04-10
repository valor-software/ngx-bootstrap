/**
 * Determines if the browser is Internet Explorer
 */
import { isBrowser } from './isBrowser';

const isIE11 = isBrowser && !!((window as any).MSInputMethodContext && (document as any).documentMode);
const isIE10 = isBrowser && !!((window as any).MSInputMethodContext && /MSIE 10/.test((navigator as any).userAgent));

export function isIE(version?: number) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }

  return isIE11 || isIE10;
}
