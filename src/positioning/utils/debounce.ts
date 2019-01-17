import { isBrowser } from './isBrowser';

const longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
let timeoutDuration = 0;
for (let i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

const windowRef: any = window;

export function microtaskDebounce(fn) {
  let called = false;

  return () => {
    if (called) {
      return undefined;
    }
    called = true

    windowRef.Promise.resolve().then(() => {
      called = false;
      fn();
    });
  };
}

export function taskDebounce(fn) {
  let scheduled = false;

  return () => {
    if (!scheduled) {
      scheduled = true;
      setTimeout(() => {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

const supportsMicroTasks = isBrowser && windowRef.Promise;


/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
*/
export const debounce = supportsMicroTasks
  ? microtaskDebounce
  : taskDebounce;
