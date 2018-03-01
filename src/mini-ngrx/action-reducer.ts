import { Action } from './action';

export type ActionReducer<T> = (state: T, action: Action) => T;
