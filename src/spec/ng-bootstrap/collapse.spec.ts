import { TestBed } from '@angular/core/testing';
import { createGenericTestComponent } from './test/common';

import { Component, ViewChild } from '@angular/core';

import { CollapseDirective, CollapseModule } from 'ngx-bootstrap/collapse';
import { Subscription } from 'rxjs';

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
    @ViewChild('collapse')
    collapse: CollapseDirective;
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
        TestBed.overrideComponent(TestComponent, {set: {template: html}});
    });

    it('should have content open and aria-expanded true', () => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const collapseEl = getCollapsibleContent(fixture.nativeElement);
        expect(collapseEl).toHaveCssClass('show');
        expect(collapseEl.getAttribute('aria-expanded')).toBe('true');
    });

    xit('should have content closed and aria-expanded false', done => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const tc = fixture.componentInstance;
        tc.collapsed = true;
        const collapseEl = getCollapsibleContent(fixture.nativeElement);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(collapseEl).not.toHaveCssClass('show');
            expect(collapseEl.getAttribute('aria-expanded')).toBe('false');
            done();
        }).catch(e => expect(e).not.toBeDefined());
    });

    xit('should toggle collapsed content based on bound model change', () => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const tc = fixture.componentInstance;
        const collapseEl = getCollapsibleContent(fixture.nativeElement);
        fixture.detectChanges();

        expect(collapseEl).toHaveCssClass('show');

        tc.collapsed = true;
        fixture.detectChanges();

        expect(collapseEl).not.toHaveCssClass('show');

        tc.collapsed = false;
        fixture.detectChanges();

        expect(collapseEl).toHaveCssClass('show');
    });

    it('should allow toggling collapse from outside', done => {
        html = `
      <button (click)="collapse.toggle()">Collapse</button>
      <div [collapse] #collapse="bs-collapse"></div>`;

        const fixture = createTestComponent(html);

        const compiled = fixture.nativeElement;
        const collapseEl = getCollapsibleContent(compiled);
        const buttonEl = compiled.querySelector('button');

        let subscription: Subscription;
        subscription = fixture.componentInstance.collapse.collapsed.subscribe(() => {
            subscription.unsubscribe();

            fixture.detectChanges();
            expect(collapseEl).not.toHaveCssClass('show');
            expect(collapseEl).toHaveCssClass('collapse');
            expect(collapseEl).not.toHaveCssClass('collapsing');

            buttonEl.click();
            fixture.detectChanges();
            expect(collapseEl).not.toHaveCssClass('show');
            expect(collapseEl).not.toHaveCssClass('collapse');
            expect(collapseEl).toHaveCssClass('collapsing');
        });

        let subscription2: Subscription;
        subscription2 = fixture.componentInstance.collapse.expanded.subscribe(() => {
            subscription2.unsubscribe();
            expect(collapseEl).toHaveCssClass('show');
            expect(collapseEl).toHaveCssClass('collapse');
            expect(collapseEl).not.toHaveCssClass('collapsing');
            done();
        });

        buttonEl.click();
        fixture.detectChanges();
        expect(collapseEl).not.toHaveCssClass('show');
        expect(collapseEl).not.toHaveCssClass('collapse');
        expect(collapseEl).toHaveCssClass('collapsing');
    });
});
