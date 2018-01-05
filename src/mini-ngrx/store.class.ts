/**
 * @copyright ngrx
 */
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Operator } from 'rxjs/Operator';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

import { map } from 'rxjs/operator/map';
import { Action, ActionReducer } from './index';

export class MiniStore<T> extends Observable<T> implements Observer<Action> {
  constructor(
    private _dispatcher: Observer<Action>,
    private _reducer: ActionReducer<any>,
    state$: Observable<any>
  ) {
    super();

    this.source = state$;
  }

  select<R>(pathOrMapFn: (state: T) => R): Observable<R> {
    const mapped$: Observable<R> = map.call(this, pathOrMapFn);

    return distinctUntilChanged.call(mapped$);
  }

  lift<R>(operator: Operator<T, R>): MiniStore<R> {
    const store = new MiniStore<R>(this._dispatcher, this._reducer, this);
    store.operator = operator;

    return store;
  }

  dispatch(action: Action) {
    this._dispatcher.next(action);
  }

  next(action: Action) {
    this._dispatcher.next(action);
  }

  error(err: any) {
    this._dispatcher.error(err);
  }

  complete() {
    /*noop*/
  }
}
