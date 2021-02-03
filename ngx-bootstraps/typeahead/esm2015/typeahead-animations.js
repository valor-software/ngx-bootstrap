import { animate, style, state, transition, trigger } from '@angular/animations';
export const TYPEAHEAD_ANIMATION_TIMING = '220ms cubic-bezier(0, 0, 0.2, 1)';
export const typeaheadAnimation = trigger('typeaheadAnimation', [
    state('animated-down', style({ height: '*', overflow: 'hidden' })),
    transition('* => animated-down', [
        style({ height: 0, overflow: 'hidden' }),
        animate(TYPEAHEAD_ANIMATION_TIMING)
    ]),
    state('animated-up', style({ height: '*', overflow: 'hidden' })),
    transition('* => animated-up', [
        style({ height: '*', overflow: 'hidden' }),
        animate(TYPEAHEAD_ANIMATION_TIMING)
    ]),
    transition('* => unanimated', animate('0s'))
]);
//# sourceMappingURL=typeahead-animations.js.map