export interface Action {
  type: string;
  /* tslint:disable-next-line: no-any */
  payload?: any;
}

export type ActionReducer<T> = (state: T, action: Action) => T;

export { MiniState } from './state.class';
export { MiniStore } from './store.class';
