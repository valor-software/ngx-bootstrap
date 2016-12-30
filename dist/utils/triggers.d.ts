/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
import { Renderer } from '@angular/core';
import { Trigger } from './trigger.class';
export declare function parseTriggers(triggers: string, aliases?: any): Trigger[];
export declare function listenToTriggers(renderer: Renderer, target: any, triggers: string, showFn: Function, hideFn: Function, toggleFn: Function): Function;
