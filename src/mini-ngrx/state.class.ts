/**
 * @copyright ngrx
 */
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Action, ActionReducer } from './index';
import { observeOn } from 'rxjs/operator/observeOn';
import { queue } from 'rxjs/scheduler/queue';
import { scan } from 'rxjs/operator/scan';

export class MiniState<T> extends BehaviorSubject<T> {
  constructor(
    _initialState: T,
    actionsDispatcher$: Observable<Action>,
    reducer: ActionReducer<T>
  ) {
    super(_initialState);

    const actionInQueue$ = observeOn.call(actionsDispatcher$, queue);
    const state$ = scan.call(
      actionInQueue$,
      (state: T, action: Action) => {
        if (!action) {
          return state;
        }

        return reducer(state, action);
      },
      _initialState
    );

    state$.subscribe((value: T) => this.next(value));
  }
}
