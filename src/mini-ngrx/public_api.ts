export interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export type ActionReducer<T> = (state: T, action: Action) => T;

export { MiniState } from './state.class';
export { MiniStore } from './store.class';
