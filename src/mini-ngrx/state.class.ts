/**
 * @copyright ngrx
 */
import { Action, ActionReducer } from './index';
import { BehaviorSubject, Observable, queueScheduler } from 'rxjs';
import { observeOn, scan } from 'rxjs/operators';


export class MiniState<T> extends BehaviorSubject<T> {
  constructor(
    _initialState: T,
    actionsDispatcher$: Observable<Action>,
    reducer: ActionReducer<T>
  ) {
    super(_initialState);

    const actionInQueue$ = actionsDispatcher$.pipe(
      observeOn(queueScheduler)
    );
    const state$ = actionInQueue$.pipe(
      scan((state: T, action: Action) => {
        if (!action) {
          return state;
        }

        return reducer(state, action);
      },
      _initialState
    ));

    state$.subscribe((value: T) => this.next(value));
  }
}
