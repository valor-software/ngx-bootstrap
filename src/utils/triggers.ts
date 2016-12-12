/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
import { Renderer } from '@angular/core';
import { Trigger } from './trigger.class';

const DEFAULT_ALIASES = {
  hover: ['mouseenter', 'mouseleave'],
  focus: ['focusin', 'focusout']
};

export function parseTriggers(triggers: string, aliases: any = DEFAULT_ALIASES): Trigger[] {
  const trimmedTriggers = (triggers || '').trim();

  if (trimmedTriggers.length === 0) {
    return [];
  }

  const parsedTriggers = trimmedTriggers.split(/\s+/)
    .map((trigger: string) => trigger.split(':'))
    .map((triggerPair: string[]) => {
      let alias = aliases[triggerPair[0]] || triggerPair;
      return new Trigger(alias[0], alias[1]);
    });

  const manualTriggers = parsedTriggers
    .filter((triggerPair: Trigger) => triggerPair.isManual());

  if (manualTriggers.length > 1) {
    throw 'Triggers parse error: only one manual trigger is allowed';
  }

  if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
    throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
  }

  return parsedTriggers;
}

export function listenToTriggers(renderer: Renderer, target: any, triggers: string,
                                 showFn: Function, hideFn: Function, toggleFn: Function): Function {
  const parsedTriggers = parseTriggers(triggers);
  const listeners: any[] = [];

  if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
    return Function.prototype;
  }

  parsedTriggers.forEach((trigger: Trigger) => {
    if (trigger.open === trigger.close) {
      listeners.push(renderer.listen(target, trigger.open, toggleFn));
      return;
    }

    listeners.push(
      renderer.listen(target, trigger.open, showFn),
      renderer.listen(target, trigger.close, hideFn));
  });

  return () => { listeners.forEach((unsubscribeFn: Function) => unsubscribeFn()); };
}
