/**
 * @copyright ngrx
 */
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Action, ActionReducer } from './index';
export declare class MiniState<T> extends BehaviorSubject<T> {
    constructor(_initialState: T, actionsDispatcher$: Observable<Action>, reducer: ActionReducer<T>);
}
