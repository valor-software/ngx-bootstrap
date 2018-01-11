/* tslint:disable:max-classes-per-file max-file-line-count component-class-suffix */
/**
 * @copyright Angular ng-bootstrap team
 */

import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { TooltipConfig, TooltipContainerComponent, TooltipDirective, TooltipModule } from '../../tooltip/index';
import { createGenericTestComponent } from './test/common';

@Component({
  selector: 'test-onpush-cmpt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``
})
export class TestOnPushComponent {}

@Component({selector: 'test-cmpt', template: ``})
export class TestComponent {
  name = 'World';
  show = true;

  @ViewChild(TooltipDirective) tooltip: TooltipDirective;

  shown(): void {
    return;
  }

  hidden(): void {
    return;
  }
}

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent);

const createOnPushTestComponent = (html: string) =>
  createGenericTestComponent(html, TestOnPushComponent);

describe('tooltip-container', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [TooltipModule.forRoot()]});
  });

  it('should render tooltip on top by default', () => {
    const fixture = TestBed.createComponent(TooltipContainerComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveCssClass('tooltip');
    expect(fixture.nativeElement).toHaveCssClass('tooltip-top');
    expect(fixture.nativeElement.getAttribute('role')).toBe('tooltip');
  });

  it('should position tooltips as requested', () => {
    const fixture = TestBed.createComponent(TooltipContainerComponent);
    fixture.componentInstance.placement = 'left';
    fixture.detectChanges();
    expect(fixture.nativeElement).toHaveCssClass('tooltip-left');
  });
});

describe('tooltip', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TestOnPushComponent],
      imports: [TooltipModule.forRoot()]
    });
  });

  function getWindow(element: any): HTMLElement {
    return element.querySelector('bs-tooltip-container');
  }

  describe('basic functionality', () => {
    it('should open and close a tooltip - default settings and content as string', () => {
      const fixture = createTestComponent(`<div tooltip="Great tip!"></div>`);
      const directive = fixture.debugElement.query(
        By.directive(TooltipDirective)
      );
      const defaultConfig = new TooltipConfig();

      directive.triggerEventHandler('mouseover', {});
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('tooltip');
      expect(windowEl).toHaveCssClass(`tooltip-${defaultConfig.placement}`);
      expect(windowEl.textContent.trim()).toBe('Great tip!');
      expect(windowEl.getAttribute('role')).toBe('tooltip');
      expect(windowEl.parentNode).toBe(fixture.nativeElement);

      directive.triggerEventHandler('mouseout', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should open and close a tooltip - default settings and content from a template', () => {
      const fixture = createTestComponent(
        `<ng-template #t>Hello, {{name}}!</ng-template><div [tooltip]="t"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(TooltipDirective)
      );

      directive.triggerEventHandler('mouseover', {});
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('tooltip');
      expect(windowEl).toHaveCssClass('tooltip-top');
      expect(windowEl.textContent.trim()).toBe('Hello, World!');
      expect(windowEl.getAttribute('role')).toBe('tooltip');
      expect(windowEl.parentNode).toBe(fixture.nativeElement);

      directive.triggerEventHandler('mouseout', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should not open a tooltip if content is falsy', () => {
      const fixture = createTestComponent(
        `<div [tooltip]="notExisting"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(TooltipDirective)
      );

      directive.triggerEventHandler('mouseover', {});
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toBeNull();
    });

    it('should close the tooltip tooltip if content becomes falsy', () => {
      const fixture = createTestComponent(`<div [tooltip]="name"></div>`);
      const directive = fixture.debugElement.query(
        By.directive(TooltipDirective)
      );

      directive.triggerEventHandler('mouseover', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      fixture.componentInstance.name = null;
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should allow re-opening previously closed tooltips', () => {
      const fixture = createTestComponent(`<div tooltip="Great tip!"></div>`);
      const directive = fixture.debugElement.query(
        By.directive(TooltipDirective)
      );

      directive.triggerEventHandler('mouseover', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      directive.triggerEventHandler('mouseout', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();

      directive.triggerEventHandler('mouseover', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
    });

    it('should not leave dangling tooltips in the DOM', () => {
      const fixture = createTestComponent(
        `<ng-template [ngIf]="show"><div tooltip="Great tip!"></div></ng-template>`
      );
      const directive = fixture.debugElement.query(
        By.directive(TooltipDirective)
      );

      directive.triggerEventHandler('mouseover', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      fixture.componentInstance.show = false;
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should properly cleanup tooltips with manual triggers', () => {
      const fixture = createTestComponent(`
            <ng-template [ngIf]="show">
              <div tooltip="Great tip!" triggers="manual" #t="bs-tooltip" (mouseover)="t.show()"></div>
            </ng-template>`);
      const directive = fixture.debugElement.query(
        By.directive(TooltipDirective)
      );

      directive.triggerEventHandler('mouseover', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      fixture.componentInstance.show = false;
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    describe('positioning', () => {
      it('should use requested position', () => {
        const fixture = createTestComponent(
          `<div tooltip="Great tip!" placement="left"></div>`
        );
        const directive = fixture.debugElement.query(
          By.directive(TooltipDirective)
        );

        directive.triggerEventHandler('mouseover', {});
        fixture.detectChanges();
        const windowEl = getWindow(fixture.nativeElement);

        expect(windowEl).toHaveCssClass('tooltip');
        expect(windowEl).toHaveCssClass('tooltip-left');
        expect(windowEl.textContent.trim()).toBe('Great tip!');
      });

      it('should properly position tooltips when a component is using the OnPush strategy', () => {
        const fixture = createOnPushTestComponent(
          `<div tooltip="Great tip!" placement="left"></div>`
        );
        const directive = fixture.debugElement.query(
          By.directive(TooltipDirective)
        );

        directive.triggerEventHandler('mouseover', {});
        fixture.detectChanges();
        const windowEl = getWindow(fixture.nativeElement);

        expect(windowEl).toHaveCssClass('tooltip');
        expect(windowEl).toHaveCssClass('tooltip-left');
        expect(windowEl.textContent.trim()).toBe('Great tip!');
      });

      it('should use auto position', () => {
        const fixture = createTestComponent(
          `<div tooltip="Great tip!" placement="auto"></div>`
        );
        const directive = fixture.debugElement.query(
          By.directive(TooltipDirective)
        );

        directive.triggerEventHandler('mouseover', {});
        fixture.detectChanges();
        const windowEl = getWindow(fixture.nativeElement);

        expect(windowEl).toHaveCssClass('tooltip');
        expect(windowEl).toHaveCssClass('tooltip-auto');
        expect(windowEl).toHaveCssClass('right');
        expect(windowEl.textContent.trim()).toBe('Great tip!');
      });
    });

    describe('triggers', () => {
      it('should support toggle triggers', () => {
        const fixture = createTestComponent(
          `<div tooltip="Great tip!" triggers="click"></div>`
        );
        const directive = fixture.debugElement.query(
          By.directive(TooltipDirective)
        );

        directive.triggerEventHandler('click', {});
        fixture.detectChanges();
        expect(getWindow(fixture.nativeElement)).not.toBeNull();

        directive.triggerEventHandler('click', {});
        fixture.detectChanges();
        expect(getWindow(fixture.nativeElement)).toBeNull();
      });

      it('should non-default toggle triggers', () => {
        const fixture = createTestComponent(
          `<div tooltip="Great tip!" triggers="mouseover:click"></div>`
        );
        const directive = fixture.debugElement.query(
          By.directive(TooltipDirective)
        );

        directive.triggerEventHandler('mouseover', {});
        fixture.detectChanges();
        expect(getWindow(fixture.nativeElement)).not.toBeNull();

        directive.triggerEventHandler('click', {});
        fixture.detectChanges();
        expect(getWindow(fixture.nativeElement)).toBeNull();
      });

      it('should support multiple triggers', () => {
        const fixture = createTestComponent(
          `<div tooltip="Great tip!" triggers="mouseover:mouseout click"></div>`
        );
        const directive = fixture.debugElement.query(
          By.directive(TooltipDirective)
        );

        directive.triggerEventHandler('mouseover', {});
        fixture.detectChanges();
        expect(getWindow(fixture.nativeElement)).not.toBeNull();

        directive.triggerEventHandler('click', {});
        fixture.detectChanges();
        expect(getWindow(fixture.nativeElement)).toBeNull();
      });

      it('should not use default for manual triggers', () => {
        const fixture = createTestComponent(
          `<div tooltip="Great tip!" triggers="manual"></div>`
        );
        const directive = fixture.debugElement.query(
          By.directive(TooltipDirective)
        );

        directive.triggerEventHandler('mouseover', {});
        fixture.detectChanges();
        expect(getWindow(fixture.nativeElement)).toBeNull();
      });

      it(
        'should allow toggling for manual triggers',
        fakeAsync(() => {
          const fixture = createTestComponent(`
                <div tooltip="Great tip!" triggers="manual" #t="bs-tooltip"></div>
                <button (click)="t.toggle()">T</button>`);
          const button = fixture.nativeElement.querySelector('button');

          button.click();
          fixture.detectChanges();
          expect(getWindow(fixture.nativeElement)).not.toBeNull();

          button.click();
          fixture.detectChanges();
          tick(150);
          expect(getWindow(fixture.nativeElement)).toBeNull();
        })
      );

      it(
        'should allow open / close for manual triggers',
        fakeAsync(() => {
          const fixture = createTestComponent(`
                <div tooltip="Great tip!" triggers="manual" #t="bs-tooltip"></div>
                <button (click)="t.show()">O</button>
                <button (click)="t.hide()">C</button>`);

          const buttons = fixture.nativeElement.querySelectorAll('button');

          buttons[0].click(); // open
          fixture.detectChanges();
          expect(getWindow(fixture.nativeElement)).not.toBeNull();

          buttons[1].click(); // close
          fixture.detectChanges();
          tick(150);
          expect(getWindow(fixture.nativeElement)).toBeNull();
        })
      );

      it('should not throw when open called for manual triggers and open tooltip', () => {
        const fixture = createTestComponent(`
                <div tooltip="Great tip!" triggers="manual" #t="bs-tooltip"></div>
                <button (click)="t.show()">O</button>`);
        const button = fixture.nativeElement.querySelector('button');

        button.click(); // open
        fixture.detectChanges();
        expect(getWindow(fixture.nativeElement)).not.toBeNull();

        button.click(); // open
        fixture.detectChanges();
        expect(getWindow(fixture.nativeElement)).not.toBeNull();
      });

      it('should not throw when closed called for manual triggers and closed tooltip', () => {
        const fixture = createTestComponent(`
                <div tooltip="Great tip!" triggers="manual" #t="bs-tooltip"></div>
                <button (click)="t.hide()">C</button>`);

        const button = fixture.nativeElement.querySelector('button');

        button.click(); // close
        fixture.detectChanges();
        expect(getWindow(fixture.nativeElement)).toBeNull();
      });
    });
  });

  describe('container', () => {
    it('should be appended to the element matching the selector passed to "container"', () => {
      const selector = 'body';
      const fixture = createTestComponent(
        `<div tooltip="Great tip!" container="` + selector + `"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(TooltipDirective)
      );

      directive.triggerEventHandler('mouseover', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(getWindow(document.querySelector(selector))).not.toBeNull();
    });

    it('should properly destroy tooltips when the "container" option is used', () => {
      const selector = 'body';
      const fixture = createTestComponent(
        `<div *ngIf="show" tooltip="Great tip!" container="` +
        selector +
        `"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(TooltipDirective)
      );

      directive.triggerEventHandler('mouseover', {});
      fixture.detectChanges();

      expect(getWindow(document.querySelector(selector))).not.toBeNull();
      fixture.componentRef.instance.show = false;
      fixture.detectChanges();
      expect(getWindow(document.querySelector(selector))).toBeNull();
    });
  });

  describe('visibility', () => {
    it('should emit events when showing and hiding popover', () => {
      const fixture = createTestComponent(
        `<div tooltip="Great tip!" triggers="click" (onShown)="shown()" (onHidden)="hidden()"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(TooltipDirective)
      );

      const shownSpy = spyOn(fixture.componentInstance, 'shown');
      const hiddenSpy = spyOn(fixture.componentInstance, 'hidden');

      directive.triggerEventHandler('click', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
      expect(shownSpy).toHaveBeenCalled();

      directive.triggerEventHandler('click', {});
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(hiddenSpy).toHaveBeenCalled();
    });

    it('should not emit close event when already closed', () => {
      const fixture = createTestComponent(
        `<div tooltip="Great tip!" triggers="manual" (onShown)="shown()" (onHidden)="hidden()"></div>`
      );

      const shownSpy = spyOn(fixture.componentInstance, 'shown');
      const hiddenSpy = spyOn(fixture.componentInstance, 'hidden');

      fixture.componentInstance.tooltip.show();
      fixture.detectChanges();

      fixture.componentInstance.tooltip.show();
      fixture.detectChanges();

      expect(getWindow(fixture.nativeElement)).not.toBeNull();
      expect(shownSpy).toHaveBeenCalled();
      expect(shownSpy.calls.count()).toEqual(1);
      expect(hiddenSpy).not.toHaveBeenCalled();
    });

    it('should not emit open event when already opened', () => {
      const fixture = createTestComponent(
        `<div tooltip="Great tip!" triggers="manual" (onShown)="shown()" (onHidden)="hidden()"></div>`
      );

      const shownSpy = spyOn(fixture.componentInstance, 'shown');
      const hiddenSpy = spyOn(fixture.componentInstance, 'hidden');

      fixture.componentInstance.tooltip.hide();
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(shownSpy).not.toHaveBeenCalled();
      expect(hiddenSpy).not.toHaveBeenCalled();
    });

    it(
      'should report correct visibility',
      fakeAsync(() => {
        const fixture = createTestComponent(
          `<div tooltip="Great tip!" triggers="manual"></div>`
        );
        fixture.detectChanges();
        expect(fixture.componentInstance.tooltip.isOpen).toBeFalsy();

        fixture.componentInstance.tooltip.show();
        fixture.detectChanges();
        tick(150);
        expect(fixture.componentInstance.tooltip.isOpen).toBeTruthy();

        fixture.componentInstance.tooltip.hide();
        fixture.detectChanges();
        tick(150);
        expect(fixture.componentInstance.tooltip.isOpen).toBeFalsy();
      })
    );
  });

  describe('Custom config', () => {
    let config: TooltipConfig;

    beforeEach(() => {
      TestBed.configureTestingModule({imports: [TooltipModule.forRoot()]});
      TestBed.overrideComponent(TestComponent, {
        set: {template: `<div tooltip="Great tip!"></div>`}
      });
    });

    beforeEach(
      inject([TooltipConfig], (c: TooltipConfig) => {
        config = c;
        config.placement = 'bottom';
        config.triggers = 'click';
        config.container = 'body';
      })
    );

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const tooltip = fixture.componentInstance.tooltip;

      expect(tooltip.placement).toBe(config.placement);
      expect(tooltip.triggers).toBe(config.triggers);
      expect(tooltip.container).toBe(config.container);
    });
  });

  describe('Custom config as provider', () => {
    const config = new TooltipConfig();
    config.placement = 'bottom';
    config.triggers = 'click';
    config.container = 'body';

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TooltipModule.forRoot()],
        providers: [{provide: TooltipConfig, useValue: config}]
      });
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = createTestComponent(`<div tooltip="Great tip!"></div>`);
      const tooltip = fixture.componentInstance.tooltip;

      expect(tooltip.placement).toBe(config.placement);
      expect(tooltip.triggers).toBe(config.triggers);
      expect(tooltip.container).toBe(config.container);
    });
  });
});

