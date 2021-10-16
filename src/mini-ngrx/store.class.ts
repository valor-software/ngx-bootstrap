/**
 * @copyright ngrx
 */
import { Observable, Observer, Operator } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Action, ActionReducer } from './index';

export class MiniStore<T> extends Observable<T> implements Observer<Action> {
  constructor(
    private _dispatcher: Observer<Action>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _reducer: ActionReducer<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state$: Observable<any>
  ) {
    super();

        this.source = state$;
  }

  select<R>(pathOrMapFn: (state: T) => R): Observable<R> {
        const mapped$: Observable<R> = this.source.pipe(map(pathOrMapFn));

    return mapped$.pipe(distinctUntilChanged());
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(err: any) {
    this._dispatcher.error(err);
  }

  complete() {
    /*noop*/
  }
}
