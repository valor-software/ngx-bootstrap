/* tslint:disable:max-classes-per-file max-file-line-count component-class-suffix */
/**
 * @copyright Angular ng-bootstrap team
 */
import { TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  Injectable,
  OnDestroy, ChangeDetectorRef
} from '@angular/core';

import {
  PopoverModule,
  PopoverContainerComponent,
  PopoverDirective,
  PopoverConfig
} from '../../popover';
import { createComponent } from './test/common';
import { dispatchMouseEvent } from '@netbasal/spectator';

@Component({selector: 'test-cmpt', template: ``})
export class TestComponent {
  name = 'World';
  show = true;
  title: string;
  placement: string;

  @ViewChild(PopoverDirective, { static: false }) popover: PopoverDirective;

  shown(): void {
    return;
  }

  hidden(): void {
    return;
  }
}

@Component({
  selector: 'test-onpush-cmpt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``
})
export class TestOnPushComponent {
  constructor(public cdRef: ChangeDetectorRef) {}
}

@Injectable()
class SpyService {
  called = false;
}

@Component({selector: 'destroyable-cmpt', template: 'Some content'})
export class DestroyableCmpt implements OnDestroy {
  constructor(private _spyService: SpyService) {
    this._spyService = _spyService;
  }

  ngOnDestroy(): void {
    this._spyService.called = true;
  }
}

const createTestComponent = (html: string) =>
  createComponent(html, TestComponent);

const createOnPushTestComponent = (html: string) =>
  createComponent(html, TestOnPushComponent, 'OnPush');

describe('popover-container', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [PopoverModule.forRoot()]
    });
  });

  it('should render popover on top by default', () => {
    const fixture = TestBed.createComponent(PopoverContainerComponent);
    fixture.componentInstance.title = 'Test title';
    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveCssClass('popover');
    expect(fixture.nativeElement).toHaveCssClass('popover-top');
    expect(fixture.nativeElement.getAttribute('role')).toBe('tooltip');
    expect(
      fixture.nativeElement.querySelector('.popover-title').textContent
    ).toBe('Test title');
  });

  it('should position popovers as requested', () => {
    const fixture = TestBed.createComponent(PopoverContainerComponent);
    fixture.componentInstance.placement = 'left';
    fixture.detectChanges();
    expect(fixture.nativeElement).toHaveCssClass('popover-left');
  });
});

describe('popover', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TestOnPushComponent, DestroyableCmpt],
      imports: [PopoverModule.forRoot()],
      providers: [SpyService]
    });
  });

  function getWindow(element: HTMLElement): HTMLElement {
    return element.querySelector('popover-container');
  }

  describe('basic functionality', () => {
    it('should open and close a popover - default settings and content as string', () => {
      const fixture = createTestComponent(
        `<div style="margin: 400px" popover="Great tip!" popoverTitle="Title"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();

      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('popover-top');
      expect(windowEl.querySelector('.popover-title').textContent.trim()).toBe('Title');
      expect(windowEl.querySelector('.popover-content').textContent.trim()).toBe('Great tip!');
      expect(windowEl.getAttribute('role')).toBe('tooltip');
      expect(windowEl.parentNode).toBe(fixture.nativeElement);

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should open and close a popover - default settings and content from a template', () => {
      const fixture = createTestComponent(`
          <ng-template #t>Hello, {{name}}!</ng-template>
          <div style="margin: 400px" [popover]="t" popoverTitle="Title"></div>`);
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );
      const defaultConfig = new PopoverConfig();

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass(`popover-${defaultConfig.placement}`);
      expect(windowEl.querySelector('.popover-title').textContent.trim()).toBe('Title');
      expect(windowEl.querySelector('.popover-content').textContent.trim()).toBe('Hello, World!');
      expect(windowEl.getAttribute('role')).toBe('tooltip');
      expect(windowEl.parentNode).toBe(fixture.nativeElement);

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should properly destroy TemplateRef content', () => {
      const fixture = createTestComponent(`
          <ng-template #t><destroyable-cmpt></destroyable-cmpt></ng-template>
          <div [popover]="t" popoverTitle="Title"></div>`);
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );
      const spyService = fixture.debugElement.injector.get(SpyService);

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
      expect(spyService.called).toBeFalsy();

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(spyService.called).toBeTruthy();
    });

    it('should allow re-opening previously closed popovers', () => {
      const fixture = createTestComponent(
        `<div popover="Great tip!" popoverTitle="Title"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
    });

    it('should not leave dangling popovers in the DOM', () => {
      const fixture = createTestComponent(
        `<ng-template [ngIf]="show"><div popover="Great tip!" popoverTitle="Title"></div></ng-template>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      fixture.componentInstance.show = false;
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should properly cleanup popovers with manual triggers', () => {
      const fixture = createTestComponent(`
<ng-template [ngIf]="show">
  <div popover="Great tip!" triggers="manual" #p="bs-popover" (mouseover)="p.show()"></div>
</ng-template>`);
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'mouseover');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      fixture.componentInstance.show = false;
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should properly set aria-describedBy and id for popover', () => {
      const fixture = createTestComponent(
        `<div id="div-container" style="margin: 400px" popover="Great tip!" popoverTitle="Title"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();

      const windowEl = getWindow(fixture.nativeElement);

      const popoverId = windowEl.getAttribute('id');

      expect(popoverId.indexOf('ngx-popover-')).toEqual(0);
      expect(fixture.nativeElement.querySelector('#div-container').getAttribute('aria-describedby')).toEqual(popoverId);

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('#div-container').getAttribute('aria-describedby')).toBeNull();
    });
  });

  describe('positioning', () => {
    it('should use requested position', () => {
      const fixture = createTestComponent(
        `<div style="padding: 400px"><div popover="Great tip!" placement="left"></div></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();

      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('popover-left');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should properly position popovers when a component is using the OnPush strategy', () => {
      const fixture = createOnPushTestComponent(
        `<div style="padding: 400px"><div popover="Great tip!" placement="left"></div></div>`
      );

      const context = fixture.componentInstance;
      context.cdRef.markForCheck();

      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);
      context.cdRef.markForCheck();

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('popover-left');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should set position to top when use auto position and fit on screen', () => {
      const fixture = createTestComponent(
        `<div style="padding: 400px"><div popover="Great tip!" placement="auto right"></div></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('popover-auto');
      expect(windowEl).toHaveCssClass('right');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should set position to bottom when use auto position', () => {
      const fixture = createTestComponent(
        `<div style="padding-bottom: 300px"><div popover="Great tip!" placement="auto bottom"></div></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('popover-auto');
      expect(windowEl).toHaveCssClass('bottom');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should set position to top when use auto position and fit on screen', () => {
      const fixture = createTestComponent(
        `<div style="padding: 400px"><div popover="Great tip!" placement="auto top"></div></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('popover-auto');
      expect(windowEl).toHaveCssClass('top');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should set position to right when use auto position and fit on screen', () => {
      const fixture = createTestComponent(
        `<div style="padding: 400px"><div popover="Great tip!" placement="auto right"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('popover-auto');
      expect(windowEl).toHaveCssClass('right');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });

    it('should set position to left when use auto position and fit on screen', () => {
      const fixture = createTestComponent(
        `<div style="padding: 400px"><div popover="Great tip!" placement="auto left"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');

      fixture.detectChanges();
      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl).toHaveCssClass('popover');
      expect(windowEl).toHaveCssClass('popover-auto');
      expect(windowEl).toHaveCssClass('left');
      expect(windowEl.textContent.trim()).toBe('Great tip!');
    });
  });

  describe('container', () => {
    it('should be appended to the element matching the selector passed to "container"', () => {
      const selector = 'body';
      const fixture = createTestComponent(`<div popover="Great tip!" container="${selector}"></div>`);
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      // expect(getWindow(window.document.querySelector(selector))).not.toBeNull();
    });

    it('should properly destroy popovers when the "container" option is used', () => {
      const selector = 'body';
      const fixture = createTestComponent(`<div *ngIf="show" popover="Great tip!" container="${selector}"></div>`);
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
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
        `<div popover="Great tip!" triggers="click" (onShown)="shown()" (onHidden)="hidden()"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      const shownSpy = spyOn(fixture.componentInstance, 'shown');
      const hiddenSpy = spyOn(fixture.componentInstance, 'hidden');

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
      expect(shownSpy).toHaveBeenCalled();

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(hiddenSpy).toHaveBeenCalled();
    });

    it('should not emit close event when already closed', () => {
      const fixture = createTestComponent(
        `<div popover="Great tip!" triggers="manual" (onShown)="shown()" (onHidden)="hidden()"></div>`
      );

      const shownSpy = spyOn(fixture.componentInstance, 'shown');
      const hiddenSpy = spyOn(fixture.componentInstance, 'hidden');

      fixture.componentInstance.popover.show();
      fixture.detectChanges();

      fixture.componentInstance.popover.show();
      fixture.detectChanges();

      expect(getWindow(fixture.nativeElement)).not.toBeNull();
      expect(shownSpy).toHaveBeenCalled();
      expect(shownSpy.calls.count()).toEqual(1);
      expect(hiddenSpy).not.toHaveBeenCalled();
    });

    it('should not emit open event when already opened', () => {
      const fixture = createTestComponent(
        `<div popover="Great tip!" triggers="manual" (onShown)="shown()" (onHidden)="hidden()"></div>`
      );

      const shownSpy = spyOn(fixture.componentInstance, 'shown');
      const hiddenSpy = spyOn(fixture.componentInstance, 'hidden');

      fixture.componentInstance.popover.hide();
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(shownSpy).not.toHaveBeenCalled();
      expect(hiddenSpy).not.toHaveBeenCalled();
    });

    it('should report correct visibility', () => {
      const fixture = createTestComponent(
        `<div popover="Great tip!" triggers="manual"></div>`
      );
      fixture.detectChanges();

      expect(fixture.componentInstance.popover.isOpen).toBeFalsy();

      fixture.componentInstance.popover.show();
      fixture.detectChanges();
      expect(fixture.componentInstance.popover.isOpen).toBeTruthy();

      fixture.componentInstance.popover.hide();
      fixture.detectChanges();
      expect(fixture.componentInstance.popover.isOpen).toBeFalsy();
    });
  });

  describe('triggers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [PopoverModule.forRoot()]
      });
    });

    it('should support toggle triggers', () => {
      const fixture = createTestComponent(
        `<div popover="Great tip!" triggers="click"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should non-default toggle triggers', () => {
      const fixture = createTestComponent(
        `<div popover="Great tip!" triggers="mouseover:click"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'mouseover');

      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should support multiple triggers', () => {
      const fixture = createTestComponent(
        `<div popover="Great tip!" triggers="mouseover:mouseout click"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'mouseover');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      dispatchMouseEvent(directive.nativeElement, 'click');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should not use default for manual triggers', () => {
      const fixture = createTestComponent(
        `<div popover="Great tip!" triggers="manual"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      dispatchMouseEvent(directive.nativeElement, 'mouseover');
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should allow toggling for manual triggers', () => {
      const fixture = createTestComponent(`
                <div popover="Great tip!" triggers="manual" #t="bs-popover"></div>
                <button (click)="t.toggle()">T</button>`);
      const button = fixture.nativeElement.querySelector('button');

      button.click();
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      button.click();
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should allow open / close for manual triggers', () => {
      const fixture = createTestComponent(`<div popover="Great tip!" triggers="manual" #t="bs-popover"></div>
                <button (click)="t.show()">O</button>
                <button (click)="t.hide()">C</button>`);
      const buttons = fixture.nativeElement.querySelectorAll('button');

      buttons[0].click(); // open
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      buttons[1].click(); // close
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });

    it('should not throw when open called for manual triggers and open popover', () => {
      const fixture = createTestComponent(`
                <div popover="Great tip!" triggers="manual" #t="bs-popover"></div>
                <button (click)="t.show()">O</button>`);
      const button = fixture.nativeElement.querySelector('button');

      button.click(); // open
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();

      button.click(); // open
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).not.toBeNull();
    });

    it('should not throw when closed called for manual triggers and closed popover', () => {
      const fixture = createTestComponent(`
                <div popover="Great tip!" triggers="manual" #t="bs-popover"></div>
                <button (click)="t.hide()">C</button>`);
      const button = fixture.nativeElement.querySelector('button');

      button.click(); // close
      fixture.detectChanges();
      expect(getWindow(fixture.nativeElement)).toBeNull();
    });
  });

  describe('Custom config', () => {
    let config: PopoverConfig;

    beforeEach(() => {
      TestBed.configureTestingModule({imports: [PopoverModule.forRoot()]});
      TestBed.overrideComponent(TestComponent, {
        set: {template: `<div popover="Great tip!"></div>`}
      });
    });

    beforeEach(
      inject([PopoverConfig], (c: PopoverConfig) => {
        config = c;
        config.placement = 'bottom';
        config.triggers = 'hover';
        config.container = 'body';
      })
    );

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const popover = fixture.componentInstance.popover;

      expect(popover.placement).toBe(config.placement);
      expect(popover.triggers).toBe(config.triggers);
      expect(popover.container).toBe(config.container);
    });
  });

  describe('Custom config as provider', () => {
    const config = new PopoverConfig();
    config.placement = 'bottom';
    config.triggers = 'hover';

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PopoverModule.forRoot()],
        providers: [{provide: PopoverConfig, useValue: config}]
      });
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = createTestComponent(`<div popover="Great tip!"></div>`);
      const popover = fixture.componentInstance.popover;

      expect(popover.placement).toBe(config.placement);
      expect(popover.triggers).toBe(config.triggers);
    });
  });
});
