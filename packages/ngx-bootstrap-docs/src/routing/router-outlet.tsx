// import {component$, useClientEffect$, useContext} from '@builder.io/qwik';
// import {ROUTING} from './routing-state';
// import { listenToRouteChanges } from './routing';
// import {routingConfig} from '../routing-config';
//
// export const RouterOutlet = component$(
//     () => {
//         const routingState = useContext(ROUTING);
//         useClientEffect$(() => {
//             listenToRouteChanges(routingState);
//         });
//         return getMatchingConfig(routingState.segments, routingConfig)?.component
//     }
// );
