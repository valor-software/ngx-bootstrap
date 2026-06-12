import { Renderer2, RendererFactory2 } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import {
  animateExpand,
  onTransitionFinished,
  TRANSITION_FALLBACK_BUFFER_MS
} from '../transition-animation';

const TIMING = '220ms cubic-bezier(0, 0, 0.2, 1)';
const DURATION = 220;
const FALLBACK = DURATION + TRANSITION_FALLBACK_BUFFER_MS;

// jsdom does not implement the TransitionEvent constructor — emulate it.
function fireTransitionEnd(target: EventTarget, propertyName: string): void {
  const event = new Event('transitionend', { bubbles: true });
  Object.assign(event, { propertyName });
  target.dispatchEvent(event);
}

describe('transition-animation', () => {
  let renderer: Renderer2;
  let el: HTMLElement;
  let rafCallbacks: (FrameRequestCallback | undefined)[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    renderer = TestBed.inject(RendererFactory2).createRenderer(null, null);
    el = document.createElement('div');
    document.body.appendChild(el);
    // jsdom has no layout — give the element a deterministic scroll size
    Object.defineProperty(el, 'scrollHeight', { value: 120, configurable: true });

    rafCallbacks = [];
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id: number) => {
      rafCallbacks[id - 1] = undefined;
    });
  });

  afterEach(() => {
    el.remove();
    jest.restoreAllMocks();
  });

  function flushRaf(): void {
    const pending = rafCallbacks.filter(Boolean);
    rafCallbacks = [];
    pending.forEach(cb => cb?.(0));
  }

  describe('onTransitionFinished', () => {
    it('should call onFinish once on a matching transitionend', fakeAsync(() => {
      const onFinish = jest.fn();
      onTransitionFinished(el, 'height', DURATION, onFinish);

      fireTransitionEnd(el, 'height');
      fireTransitionEnd(el, 'height');
      tick(FALLBACK);

      expect(onFinish).toHaveBeenCalledTimes(1);
    }));

    it('should ignore transitionend from child elements and unrelated properties', fakeAsync(() => {
      const child = document.createElement('span');
      el.appendChild(child);
      const onFinish = jest.fn();
      onTransitionFinished(el, 'height', DURATION, onFinish);

      fireTransitionEnd(child, 'height');
      fireTransitionEnd(el, 'opacity');
      expect(onFinish).not.toHaveBeenCalled();

      tick(FALLBACK);
      expect(onFinish).toHaveBeenCalledTimes(1);
    }));

    it('should fall back after durationMs + buffer when transitionend never fires', fakeAsync(() => {
      const onFinish = jest.fn();
      onTransitionFinished(el, 'height', DURATION, onFinish);

      tick(FALLBACK - 1);
      expect(onFinish).not.toHaveBeenCalled();
      tick(1);
      expect(onFinish).toHaveBeenCalledTimes(1);
    }));

    it('should never call onFinish after cancel, and cancel should be idempotent', fakeAsync(() => {
      const onFinish = jest.fn();
      const ref = onTransitionFinished(el, 'height', DURATION, onFinish);

      ref.cancel();
      ref.cancel();
      fireTransitionEnd(el, 'height');
      tick(FALLBACK);

      expect(onFinish).not.toHaveBeenCalled();
    }));
  });

  describe('animateExpand', () => {
    it('should set transition styles and expand to scrollHeight synchronously by default', () => {
      const cancel = animateExpand(renderer, el, { timing: TIMING, durationMs: DURATION });

      expect(el.style.overflow).toBe('hidden');
      expect(el.style.transition).toContain('height');
      expect(el.style.height).toBe('120px');

      cancel();
    });

    it('should remove inline styles and call onDone on a matching transitionend', fakeAsync(() => {
      const onDone = jest.fn();
      animateExpand(renderer, el, { timing: TIMING, durationMs: DURATION, onDone });

      fireTransitionEnd(el, 'height');

      expect(el.style.height).toBe('');
      expect(el.style.overflow).toBe('');
      expect(el.style.transition).toBe('');
      expect(onDone).toHaveBeenCalledTimes(1);

      tick(FALLBACK);
      expect(onDone).toHaveBeenCalledTimes(1);
    }));

    it('should ignore transitionend bubbled from a child element', fakeAsync(() => {
      const child = document.createElement('span');
      el.appendChild(child);
      const onDone = jest.fn();
      animateExpand(renderer, el, { timing: TIMING, durationMs: DURATION, onDone });

      fireTransitionEnd(child, 'height');

      expect(el.style.height).toBe('120px');
      expect(onDone).not.toHaveBeenCalled();

      tick(FALLBACK);
      expect(onDone).toHaveBeenCalledTimes(1);
    }));

    it('should ignore transitionend for an unrelated property', fakeAsync(() => {
      const onDone = jest.fn();
      animateExpand(renderer, el, { timing: TIMING, durationMs: DURATION, onDone });

      fireTransitionEnd(el, 'opacity');

      expect(el.style.height).toBe('120px');
      expect(onDone).not.toHaveBeenCalled();

      tick(FALLBACK);
      expect(onDone).toHaveBeenCalledTimes(1);
    }));

    it('should clean up via the fallback timeout when transitionend never fires', fakeAsync(() => {
      const onDone = jest.fn();
      animateExpand(renderer, el, { timing: TIMING, durationMs: DURATION, onDone });

      tick(FALLBACK - 1);
      expect(el.style.height).toBe('120px');
      expect(onDone).not.toHaveBeenCalled();

      tick(1);
      expect(el.style.height).toBe('');
      expect(onDone).toHaveBeenCalledTimes(1);
    }));

    it('should not remove styles or call onDone after cancel', fakeAsync(() => {
      const onDone = jest.fn();
      const cancel = animateExpand(renderer, el, { timing: TIMING, durationMs: DURATION, onDone });

      cancel();
      tick(FALLBACK);
      fireTransitionEnd(el, 'height');

      expect(el.style.height).toBe('120px');
      expect(el.style.overflow).toBe('hidden');
      expect(onDone).not.toHaveBeenCalled();
    }));

    it('should defer the target size to requestAnimationFrame when useRaf is set', fakeAsync(() => {
      animateExpand(renderer, el, { timing: TIMING, durationMs: DURATION, useRaf: true });

      expect(el.style.height).toBe('0px');
      flushRaf();
      expect(el.style.height).toBe('120px');

      tick(FALLBACK);
    }));

    it('should not set the target size when cancelled before the rAF fires', fakeAsync(() => {
      const onDone = jest.fn();
      const cancel = animateExpand(renderer, el, { timing: TIMING, durationMs: DURATION, useRaf: true, onDone });

      cancel();
      flushRaf();
      tick(FALLBACK);

      expect(window.cancelAnimationFrame).toHaveBeenCalled();
      expect(el.style.height).toBe('0px');
      expect(onDone).not.toHaveBeenCalled();
    }));

    it('should set display:block up front and remove it on finish when manageDisplay is set', fakeAsync(() => {
      animateExpand(renderer, el, { timing: TIMING, durationMs: DURATION, manageDisplay: true });

      expect(el.style.display).toBe('block');
      fireTransitionEnd(el, 'height');
      expect(el.style.display).toBe('');

      tick(FALLBACK);
    }));

    it('should animate max-height when configured and clean it up', fakeAsync(() => {
      animateExpand(renderer, el, { property: 'max-height', timing: TIMING, durationMs: DURATION });

      expect(el.style.maxHeight).toBe('120px');
      expect(el.style.transition).toContain('max-height');

      fireTransitionEnd(el, 'max-height');
      expect(el.style.maxHeight).toBe('');

      tick(FALLBACK);
    }));
  });
});
