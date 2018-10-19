/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
import { Renderer2 } from '@angular/core';
import { Trigger } from './trigger.class';
import { BsEventCallback, ListenOptions } from '../component-loader/listen-options.model';
export declare function parseTriggers(triggers: string, aliases?: any): Trigger[];
export declare function listenToTriggers(renderer: Renderer2, target: any, triggers: string, showFn: BsEventCallback, hideFn: BsEventCallback, toggleFn: BsEventCallback): Function;
export declare function listenToTriggersV2(renderer: Renderer2, options: ListenOptions): Function;
export declare function registerOutsideClick(renderer: Renderer2, options: ListenOptions): Function;
