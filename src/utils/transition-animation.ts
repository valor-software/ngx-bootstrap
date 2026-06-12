import { Renderer2 } from '@angular/core';

/** Extra time given to the fallback timeout beyond the transition duration. */
export const TRANSITION_FALLBACK_BUFFER_MS = 50;

export interface TransitionFinishedRef {
  /** Removes the transitionend listener and clears the fallback timeout. Never calls onFinish. Idempotent. */
  cancel(): void;
}

/**
 * Waits for a CSS transition on `property` to finish on `el` and calls `onFinish` exactly once.
 *
 * Listens for `transitionend`, guarded against bubbled events from child elements and unrelated
 * properties. If the event never fires (e.g. the transition start and end values are equal),
 * a fallback timeout of `durationMs + TRANSITION_FALLBACK_BUFFER_MS` triggers `onFinish` instead.
 */
export function onTransitionFinished(
  el: HTMLElement,
  property: string,
  durationMs: number,
  onFinish: () => void
): TransitionFinishedRef {
  let finished = false;

  const handler = (e: TransitionEvent) => {
    if (e.target !== el || e.propertyName !== property) {
      return;
    }
    finish();
  };

  const fallbackTimeoutId = setTimeout(() => finish(), durationMs + TRANSITION_FALLBACK_BUFFER_MS);

  const cancel = () => {
    finished = true;
    el.removeEventListener('transitionend', handler as EventListener);
    clearTimeout(fallbackTimeoutId);
  };

  const finish = () => {
    if (finished) {
      return;
    }
    cancel();
    onFinish();
  };

  el.addEventListener('transitionend', handler as EventListener);

  return { cancel };
}

export interface ExpandAnimationOptions {
  /** CSS property to animate. `max-height` avoids conflicts with `height` bindings. Default: `height`. */
  property?: 'height' | 'max-height';
  /** CSS transition timing, e.g. `'220ms cubic-bezier(0, 0, 0.2, 1)'`. */
  timing: string;
  /** Transition duration in ms; drives the fallback timeout. */
  durationMs: number;
  /** Set the target size inside a requestAnimationFrame instead of synchronously after the reflow. */
  useRaf?: boolean;
  /** Set `display: block` before animating and remove it when finished. */
  manageDisplay?: boolean;
  /** Called after the inline styles are cleaned up. Not called when the animation is cancelled. */
  onDone?: () => void;
}

/**
 * Expands `el` from 0 to its scroll size with a native CSS transition on `height`/`max-height`.
 *
 * Pins the element at 0, forces a synchronous reflow so the browser registers the start value,
 * then sets the target size and lets the CSS engine interpolate. Inline styles are removed when
 * the transition ends (or the fallback timeout fires).
 *
 * Returns a cancel function for `ngOnDestroy`: it stops all pending work without removing
 * inline styles (the element is being torn down) and without calling `onDone`. Idempotent.
 */
export function animateExpand(renderer: Renderer2, el: HTMLElement, options: ExpandAnimationOptions): () => void {
  const property = options.property ?? 'height';

  if (options.manageDisplay) {
    renderer.setStyle(el, 'display', 'block');
  }
  renderer.setStyle(el, 'overflow', 'hidden');
  renderer.setStyle(el, 'transition', `${property} ${options.timing}`);
  renderer.setStyle(el, property, '0');

  // forced reflow — locks the 0 value in as the CSS "before-change" state
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  el.offsetHeight;

  let rafId: number | undefined;
  let transitionRef: TransitionFinishedRef | undefined;

  const finish = () => {
    renderer.removeStyle(el, property);
    renderer.removeStyle(el, 'overflow');
    renderer.removeStyle(el, 'transition');
    if (options.manageDisplay) {
      renderer.removeStyle(el, 'display');
    }
    options.onDone?.();
  };

  // The fallback timer starts now, before any rAF, so a cancelled or starved rAF
  // can never leave the element stuck at 0.
  transitionRef = onTransitionFinished(el, property, options.durationMs, finish);

  const setTarget = () => {
    rafId = undefined;
    renderer.setStyle(el, property, `${el.scrollHeight}px`);
  };

  if (options.useRaf) {
    rafId = requestAnimationFrame(setTarget);
  } else {
    setTarget();
  }

  return () => {
    if (rafId !== undefined) {
      cancelAnimationFrame(rafId);
      rafId = undefined;
    }
    transitionRef?.cancel();
    transitionRef = undefined;
  };
}
