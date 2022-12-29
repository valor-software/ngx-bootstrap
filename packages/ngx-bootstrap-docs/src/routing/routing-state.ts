import {createContext} from '@builder.io/qwik';

export interface RoutingState {
    // we don't want to store new Url() because it is not serializable
    url: string;
    segments: string[];
}

export const ROUTING = createContext<RoutingState>('Routing');
