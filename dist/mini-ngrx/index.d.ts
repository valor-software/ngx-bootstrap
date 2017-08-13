export interface Action {
    type: string;
    payload?: any;
}
export declare type ActionReducer<T> = (state: T, action: Action) => T;
export { MiniState } from './state.class';
export { MiniStore } from './store.class';
