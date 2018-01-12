// revision 6c0b585aa4a7c13c44631915d13488e6967162f4
import { TestBed } from '@angular/core/testing';
import { createGenericTestComponent } from './test/common';

import { Component } from '@angular/core';

import { CollapseModule } from '../../collapse/index';

@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  collapsed = false;
}

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent);

function getCollapsibleContent(element: HTMLElement): Element {
  return element.querySelector('.collapse');
}

describe('bs-collapse', () => {
  let html = `<div [collapse]="collapsed">Some content</div>`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [CollapseModule]
    });
    TestBed.overrideComponent(TestComponent, { set: { template: html } });
  });

  it('should have content open and aria-expanded true', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const collapseEl = getCollapsibleContent(fixture.nativeElement);

    expect(collapseEl).toHaveCssClass('in');
    expect(collapseEl).toHaveCssClass('show');
    expect(collapseEl.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have content closed and aria-expanded false', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const tc = fixture.componentInstance;
    tc.collapsed = true;
    fixture.detectChanges();

    const collapseEl = getCollapsibleContent(fixture.nativeElement);

    expect(collapseEl).not.toHaveCssClass('in');
    expect(collapseEl).not.toHaveCssClass('show');
    expect(collapseEl.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle collapsed content based on bound model change', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const tc = fixture.componentInstance;
    const collapseEl = getCollapsibleContent(fixture.nativeElement);
    expect(collapseEl).toHaveCssClass('in');
    expect(collapseEl).toHaveCssClass('show');

    tc.collapsed = true;
    fixture.detectChanges();
    expect(collapseEl).not.toHaveCssClass('in');
    expect(collapseEl).not.toHaveCssClass('show');

    tc.collapsed = false;
    fixture.detectChanges();
    expect(collapseEl).toHaveCssClass('in');
    expect(collapseEl).toHaveCssClass('show');
  });

  it('should allow toggling collapse from outside', () => {
    html = `
      <button (click)="collapse.toggle()">Collapse</button>
      <div [collapse] #collapse="bs-collapse"></div>`;

    const fixture = createTestComponent(html);

    const compiled = fixture.nativeElement;
    const collapseEl = getCollapsibleContent(compiled);
    const buttonEl = compiled.querySelector('button');

    buttonEl.click();
    fixture.detectChanges();
    expect(collapseEl).not.toHaveCssClass('in');
    expect(collapseEl).not.toHaveCssClass('show');

    buttonEl.click();
    fixture.detectChanges();
    expect(collapseEl).toHaveCssClass('in');
    expect(collapseEl).toHaveCssClass('show');
  });
});
