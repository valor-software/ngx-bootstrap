/*tslint:disable:no-invalid-this */
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

type onChangeCallbackType<T> = (value: T, prevValue: T, propertyKey: string) => void;
/* tslint:disable-next-line: no-any */
type onChangeHandlerType = (target: any, propertyKey: string) => void;
type callbackType<T> = onChangeCallbackType<T> | EventEmitter<T> | Subject<T> | string;

export function OnChange<T>(callback?: callbackType<T>): onChangeHandlerType {
  const sufix = 'Change';

  function emitValue(_callback: callbackType<T>, value: T, prevValue: T, propertyKey: string): void {
    if (_callback instanceof EventEmitter) {
      _callback.emit(value);
    } else if (_callback instanceof Subject) {
      _callback.next(value);
    } else if (_callback instanceof Function) {
      _callback.call(this, value, prevValue, propertyKey);
    }
  }

  return function onChangeHandler(target, propertyKey) {
    const _key = `__${propertyKey}Value`;
    Object.defineProperty(target, propertyKey, {
      get(): T {
        return this[_key];
      },
      set(value: T): void {
        const prevValue = this[_key];
        this[_key] = value;
        if (prevValue === value) {
          return;
        }
        const _callbackName = typeof callback === 'undefined' ? propertyKey + sufix : callback;
        const _callback = typeof _callbackName === 'string' ? this[_callbackName] : _callbackName;
        emitValue.call(this, _callback, value, prevValue, propertyKey);
      }
    });
  };
}

/* tslint:enable */
