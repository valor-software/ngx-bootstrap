/**
 * @copyright ngrx
 */
import { Observable, Observer, Operator } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Action, ActionReducer } from './index';

export class MiniStore<T> extends Observable<T> implements Observer<Action> {
  constructor(
    private _dispatcher: Observer<Action>,
    /* tslint:disable-next-line: no-any */
    private _reducer: ActionReducer<any>,
    /* tslint:disable-next-line: no-any */
    state$: Observable<any>
  ) {
    super();

    /* tslint:disable-next-line: deprecation */
    this.source = state$;
  }

  select<R>(pathOrMapFn: (state: T) => R): Observable<R> {
    /* tslint:disable-next-line: deprecation */
    const mapped$: Observable<R> = this.source.pipe(map(pathOrMapFn));

    return mapped$.pipe(distinctUntilChanged());
  }

  lift<R>(operator: Operator<T, R>): MiniStore<R> {
    const store = new MiniStore<R>(this._dispatcher, this._reducer, this);
    /* tslint:disable-next-line: deprecation */
    store.operator = operator;

    return store;
  }

  dispatch(action: Action) {
    this._dispatcher.next(action);
  }

  next(action: Action) {
    this._dispatcher.next(action);
  }

  /* tslint:disable-next-line: no-any */
  error(err: any) {
    this._dispatcher.error(err);
  }

  complete() {
    /*noop*/
  }
}
