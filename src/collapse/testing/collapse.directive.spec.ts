import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import '../../../scripts/jest/toHaveCssClass';
import { CollapseDirective, CollapseModule } from '../index';
import { COLLAPSE_ANIMATION_DURATION_MS } from '../collapse-animations';
import { TRANSITION_FALLBACK_BUFFER_MS } from 'ngx-bootstrap/utils';

// in jsdom elements has zero size by default
const template = `
  <div [collapse]="isCollapsed" style='height: 300px;width: 500px;'>
    collapse directive
    <div [hidden]="isHidden">dynamic content</div>
  </div>
`;

@Component({
    selector: 'collapse-test',
    template,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CollapseModule]
})
class TestCollapseComponent {}

// TODO: - add animate
//       - check callbacks have been called or not called (expanding, expanded, collapsing, collapsed)

describe('Directive: Collapse', () => {
  let fixture: ComponentFixture<TestCollapseComponent>;
  let element;
  let context;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        CollapseModule,
        TestCollapseComponent
    ]
});
    fixture = TestBed.createComponent(TestCollapseComponent);
    fixture.detectChanges();
    context = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('.collapse');
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  it('should have collapse class', () => {
    const div = fixture.nativeElement.querySelector('div');
    expect(div.classList).toContain('collapse');
  });

  it('should add/remove in class on toggle', () => {
    expect(element.classList).toContain('in');
    context.isCollapsed = true;
    fixture.detectChanges();
    expect(element.classList).not.toContain('in');
  });

  it('should be hidden on initialization if isCollapsed = true', () => {
    context.isCollapsed = true;
    fixture.detectChanges();
    expect(element.offsetHeight).toBe(0);
  });

  xit(
    'should not trigger any animation on initialization if isCollapsed = true',
    () => {
      expect(true);
    }
  );

  it('should collapse if isCollapsed = true on subsequent use', () => {
    context.isCollapsed = false;
    fixture.detectChanges();
    context.isCollapsed = true;
    fixture.detectChanges();
    expect(element.offsetHeight).toBe(0);
  });

  // in jsdom offsetHeight is always zero
  it('should show after toggled from collapsed', fakeAsync(() => {
    context.isCollapsed = true;
    fixture.detectChanges();
    // expect(element.offsetHeight).toBe(0);
    expect(element).not.toHaveCssClass('show');

    context.isCollapsed = false;
    fixture.detectChanges();
    // expect(element.offsetHeight).not.toBe(0);
    expect(element).toHaveCssClass('show');
  }));

  xit(
    'should not trigger any animation on initialization if isCollapsed = false',
    () => {
      expect(true);
    }
  );

  // in jsdom offsetHeight is always zero
  it('should expand if isCollapsed = false on subsequent use', () => {
    context.isCollapsed = false;
    fixture.detectChanges();
    context.isCollapsed = true;
    fixture.detectChanges();
    context.isCollapsed = false;
    fixture.detectChanges();
    // expect(element.offsetHeight).not.toBe(0);
    expect(element).toHaveCssClass('show');
  });

  it('should collapse if isCollapsed = true on subsequent uses', () => {
    context.isCollapsed = false;
    fixture.detectChanges();
    context.isCollapsed = true;
    fixture.detectChanges();
    context.isCollapsed = false;
    fixture.detectChanges();
    context.isCollapsed = true;
    fixture.detectChanges();
    expect(element.offsetHeight).toBe(0);
  });

  it('should change aria-hidden attribute', () => {
    expect(element.getAttribute('aria-hidden')).toBe('false');
    context.isCollapsed = true;
    fixture.detectChanges();
    expect(element.getAttribute('aria-hidden')).toBe('true');
  });

  describe('dynamic content', () => {
    it('should grow accordingly when content size inside collapse increases', () => {
      context.isCollapsed = false;
      context.isHidden = true;
      fixture.detectChanges();
      const heightWithoutDynamic = element.offsetHeight;
      context.isHidden = false;
      fixture.detectChanges();
      const heightWithDynamic = element.offsetHeight;
      expect(heightWithDynamic).toBeGreaterThanOrEqual(heightWithoutDynamic);
    });

    it('should shrink accordingly when content size inside collapse decreases', () => {
      context.isCollapsed = false;
      context.isHidden = false;
      fixture.detectChanges();
      const heightWithDynamic = element.offsetHeight;
      context.isHidden = true;
      fixture.detectChanges();
      const heightWithoutDynamic = element.offsetHeight;
      expect(heightWithoutDynamic).toBeLessThanOrEqual(heightWithDynamic);
    });
  });

  describe('expanding callback returning a promise', () => {
    xit('should wait for it to resolve before animating', () => {
      expect(true);
    });

    xit('should not animate if it rejects', () => {
      expect(true);
    });
  });

  describe('collapsing callback returning a promise', () => {
    xit('should wait for it to resolve before animating', () => {
      expect(true);
    });

    xit('should not animate if it rejects', () => {
      expect(true);
    });
  });
});

@Component({
  selector: 'collapse-animated-test',
  template: `<div [collapse]="isCollapsed" [isAnimated]="true" style="height: 300px;">collapse directive</div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CollapseModule]
})
class TestAnimatedCollapseComponent {
  isCollapsed = false;
}

// jsdom does not implement the TransitionEvent constructor — emulate it.
function fireTransitionEnd(target: EventTarget, propertyName: string): void {
  const event = new Event('transitionend', { bubbles: true });
  Object.assign(event, { propertyName });
  target.dispatchEvent(event);
}

describe('Directive: Collapse (animated)', () => {
  const FALLBACK = COLLAPSE_ANIMATION_DURATION_MS + TRANSITION_FALLBACK_BUFFER_MS;

  let fixture: ComponentFixture<TestAnimatedCollapseComponent>;
  let context: TestAnimatedCollapseComponent;
  let element: HTMLElement;
  let directive: CollapseDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestAnimatedCollapseComponent]
    });
    // run rAF callbacks synchronously so the animation choreography is deterministic
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });

    fixture = TestBed.createComponent(TestAnimatedCollapseComponent);
    fixture.detectChanges();
    context = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('.collapse');
    directive = fixture.debugElement
      .query(By.directive(CollapseDirective))
      .injector.get(CollapseDirective);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should apply transition styles while expanding and clean them up on transitionend', fakeAsync(() => {
    context.isCollapsed = true;
    fixture.detectChanges();
    tick(FALLBACK);

    const expanded = jest.fn();
    directive.expanded.subscribe(expanded);

    context.isCollapsed = false;
    fixture.detectChanges();

    expect(element.style.transition).toContain('height');
    expect(element.style.overflow).toBe('hidden');
    expect(expanded).not.toHaveBeenCalled();

    fireTransitionEnd(element, 'height');

    expect(expanded).toHaveBeenCalledTimes(1);
    expect(element.style.height).toBe('');
    expect(element.style.transition).toBe('');
    expect(element.style.overflow).toBe('');
    expect(element.style.display).toBe('');
  }));

  it('should ignore transitionend events bubbled from children or for other properties', fakeAsync(() => {
    context.isCollapsed = true;
    fixture.detectChanges();
    tick(FALLBACK);

    const expanded = jest.fn();
    directive.expanded.subscribe(expanded);

    context.isCollapsed = false;
    fixture.detectChanges();

    fireTransitionEnd(element, 'opacity');
    expect(expanded).not.toHaveBeenCalled();

    tick(FALLBACK);
    expect(expanded).toHaveBeenCalledTimes(1);
  }));

  it('should set display:none and emit collapsed via the fallback timeout', fakeAsync(() => {
    const collapsed = jest.fn();
    directive.collapsed.subscribe(collapsed);

    context.isCollapsed = true;
    fixture.detectChanges();

    expect(collapsed).not.toHaveBeenCalled();

    tick(FALLBACK - 1);
    expect(collapsed).not.toHaveBeenCalled();
    tick(1);

    expect(collapsed).toHaveBeenCalledTimes(1);
    expect(element.style.display).toBe('none');
    expect(element.style.height).toBe('');
    expect(element.style.transition).toBe('');
  }));

  it('should reverse to collapsed when the input flips mid-expand', fakeAsync(() => {
    context.isCollapsed = true;
    fixture.detectChanges();
    tick(FALLBACK);

    const collapsed = jest.fn();
    const expanded = jest.fn();
    directive.collapsed.subscribe(collapsed);
    directive.expanded.subscribe(expanded);

    context.isCollapsed = false;
    fixture.detectChanges();

    // flip back while the expand transition is still running
    context.isCollapsed = true;
    fixture.detectChanges();

    // finish the expand — the directive should notice the newer value and reverse
    fireTransitionEnd(element, 'height');
    expect(expanded).not.toHaveBeenCalled();

    // finish the reversal collapse
    fireTransitionEnd(element, 'height');

    expect(collapsed).toHaveBeenCalledTimes(1);
    expect(element.style.display).toBe('none');
    tick(FALLBACK);
    expect(collapsed).toHaveBeenCalledTimes(1);
  }));

  it('should reverse mid-flight when toggled directly during a transition', fakeAsync(() => {
    context.isCollapsed = true;
    fixture.detectChanges();
    tick(FALLBACK);

    const expanded = jest.fn();
    directive.expanded.subscribe(expanded);

    context.isCollapsed = false;
    fixture.detectChanges();
    // reverse mid-flight via the public API — exercises the height-snapshot path
    // (the directive reconciles against the latest input value when it finishes)
    directive.hide();
    directive.show();

    fireTransitionEnd(element, 'height');

    expect(expanded).toHaveBeenCalledTimes(1);
    expect(element.style.height).toBe('');
  }));

  it('should clean up pending timers and listeners on destroy mid-animation', fakeAsync(() => {
    const expanded = jest.fn();
    directive.expanded.subscribe(expanded);

    context.isCollapsed = true;
    fixture.detectChanges();
    tick(FALLBACK);

    context.isCollapsed = false;
    fixture.detectChanges();

    fixture.destroy();
    tick(FALLBACK * 2);
    fireTransitionEnd(element, 'height');

    expect(expanded).not.toHaveBeenCalled();
  }));
});
