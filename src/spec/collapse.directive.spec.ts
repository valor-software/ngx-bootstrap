// tslint:disable:max-file-line-count
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseDirective, CollapseModule } from 'ngx-bootstrap/collapse';
import { Subscription } from 'rxjs';

const template = `
  <div [collapse]="isCollapsed">
    collapse directive
    <div [hidden]="isHidden">dynamic content</div>
  </div>
`;

@Component({
  selector: 'collapse-test',
  template
})
class TestCollapseComponent {
  @ViewChild(CollapseDirective)
  collapse: CollapseDirective;
  isCollapsed = false;
  isHidden = false;
}

describe('Directive: Collapse', () => {
  let fixture: ComponentFixture<TestCollapseComponent>;
  let element: HTMLDivElement;
  let context: TestCollapseComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCollapseComponent],
      imports: [CollapseModule]
    });
    fixture = TestBed.createComponent(TestCollapseComponent);
    fixture.detectChanges();
    context = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('.collapse');
  });

  it('should have collapse class', () => {
    const div = fixture.nativeElement.querySelector('div');
    expect(div.classList).toContain('collapse');
  });

  it('should be hidden on initialization if isCollapsed = true and ' +
    'should not trigger any animation on initialization', () => {
    fixture = TestBed.createComponent(TestCollapseComponent);
    fixture.componentInstance.isCollapsed = true;
    fixture.detectChanges();
    // animation test by immediate height check
    element = fixture.nativeElement.querySelector('.collapse');
    expect(element.offsetHeight).toBe(0);
  });

  it('should collapse if isCollapsed = true on subsequent use', done => {
    context.isCollapsed = false;
    fixture.detectChanges();
    expect(element.offsetHeight).not.toBe(0);

    let subscription: Subscription;

    const detectCollapsed = () => {
      subscription = context.collapse.collapsed.subscribe(() => {
        subscription.unsubscribe();
        expect(element.offsetHeight).toBe(0);
        done();
      });
    };
    const detectCollapsing = () => {
      subscription = context.collapse.collapses.subscribe(() => {
        subscription.unsubscribe();
        detectCollapsed();
      });
    };
    const triggerCollapse = () => {
      detectCollapsing();
      context.isCollapsed = true;
      fixture.detectChanges();
    };

    triggerCollapse();
  });

  it('should show after toggled from isCollapsed', done => {
    let subscription: Subscription;

    const detectExpanded = () => {
      subscription = context.collapse.expanded.subscribe(() => {
        subscription.unsubscribe();
        expect(element.offsetHeight).not.toBe(0);
        done();
      });
    };
    const detectCollapsed = () => {
      subscription = context.collapse.collapsed.subscribe(() => {
        subscription.unsubscribe();
        expect(element.offsetHeight).toBe(0);
        detectExpanded();
        context.isCollapsed = false;
        fixture.detectChanges();
      });
    };
    const triggerCollapse = () => {
      detectCollapsed();
      context.isCollapsed = true;
      fixture.detectChanges();
    };

    triggerCollapse();
  });

  xit(
    'should not trigger any animation on initialization if isHidden = false',
    () => {
      expect(true);
    }
  );

  it('should expand if isCollapsed = false on subsequent use', () => {
    context.isCollapsed = false;
    fixture.detectChanges();
    context.isCollapsed = true;
    fixture.detectChanges();
    context.isCollapsed = false;
    fixture.detectChanges();
    expect(element.offsetHeight).not.toBe(0);
  });

  it('should collapse if isCollapsed = true on subsequent uses', done => {
    context.isCollapsed = false;
    fixture.detectChanges();
    context.isCollapsed = true;
    fixture.detectChanges();
    context.isCollapsed = false;
    fixture.detectChanges();
    context.collapse.collapsed.subscribe(() => {
      expect(element.offsetHeight).toBe(0);
      done();
    });
    context.isCollapsed = true;
    fixture.detectChanges();
  });

  it('should change aria-expanded attribute', () => {
    expect(element.getAttribute('aria-expanded')).toBe('true');
    context.isCollapsed = true;
    fixture.detectChanges();
    expect(element.getAttribute('aria-expanded')).toBe('false');
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
