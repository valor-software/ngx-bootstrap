// tslint:disable:max-file-line-count
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseModule } from '../collapse/collapse.module';

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
class TestCollapseComponent {}

// TODO: - add animate
//       - check callbacks have been called or not called (expanding, expanded, collapsing, collapsed)

describe('Directive: Collapse', () => {
  let fixture: ComponentFixture<TestCollapseComponent>;
  let element: any;
  let context: any;

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

  it('should show after toggled from collapsed', () => {
    context.isCollapsed = true;
    fixture.detectChanges();
    expect(element.offsetHeight).toBe(0);
    context.isCollapsed = false;
    fixture.detectChanges();
    expect(element.offsetHeight).not.toBe(0);
  });

  xit(
    'should not trigger any animation on initialization if isCollapsed = false',
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
