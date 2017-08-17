/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
import { ElementRef, Renderer } from '@angular/core';
import { Trigger } from './trigger.class';
import { ListenOptions } from '../component-loader/listen-options.model';

const DEFAULT_ALIASES = {
  hover: ['mouseover', 'mouseout'],
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

export function listenToTriggersV2(renderer: Renderer, options: ListenOptions): Function {
  const parsedTriggers = parseTriggers(options.triggers);
  const target = options.target.hasOwnProperty('nativeElement') ? (options.target as ElementRef).nativeElement : options.target;
  // do nothing
  if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
    return Function.prototype;
  }

  // all listeners
  const listeners: any[] = [];

  // lazy listeners registration
  const _registerHide: Function[] = [];
  const registerHide = () => {
    // add hide listeners to unregister array
    _registerHide.forEach((fn) => listeners.push(fn()));
    // register hide events only once
    _registerHide.length = 0;
  };

  // register open\close\toggle listeners
  parsedTriggers.forEach((trigger: Trigger) => {
    const useToggle = trigger.open === trigger.close;
    const showFn = useToggle ? options.toggle : options.show;

    if (!useToggle) {
      _registerHide.push(() => renderer.listen(target, trigger.close, options.hide));
    }

    listeners.push(renderer.listen(target, trigger.open, () => showFn(registerHide)));
  });

  // register outside click
  // _registerHide.push(() => registerOutsideClick(renderer, options));
  return () => {
    listeners.forEach((unsubscribeFn: Function) => unsubscribeFn());
  };
}

export function registerOutsideClick(renderer: Renderer, options: ListenOptions) {
  if (!options.outsideClick) {
    return Function.prototype;
  }
  const target = options.target.hasOwnProperty('nativeElement') ? (options.target as ElementRef).nativeElement : options.target;
  return renderer.listenGlobal('document', 'click', (event: any) => {
    if (!target.contains(event.target)) {
      options.hide();
    }
  });
}
