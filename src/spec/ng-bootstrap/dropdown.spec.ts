/* tslint:disable:max-classes-per-file max-file-line-count component-class-suffix */
// revision 6c0b585aa4a7c13c44631915d13488e6967162f4
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { createGenericTestComponent } from './test/common';

import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// import { DropdownModule } from './dropdown.module';
// import { DropdownDirective } from './dropdown';
// import { DropdownConfig } from './dropdown-config';

import { DropdownConfig, DropdownModule, DropdownDirective } from '../../dropdown';

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getDropdownEl(tc: any): any {
  return tc.querySelector(`[dropdown]`);
}

xdescribe('bs-dropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [DropdownModule.forRoot()]});
  });

  xit('should initialize inputs with provided config', () => {
    const defaultConfig = new DropdownConfig();
    const dropdown = new DropdownDirective(defaultConfig);
    expect(dropdown.up).toBe(defaultConfig.up);
    expect(dropdown.autoClose).toBe(defaultConfig.autoClose);
  });

  it('should be closed and down by default', () => {
    const html = `<div dropdown></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(getDropdownEl(compiled)).toHaveCssClass('dropdown');
    expect(getDropdownEl(compiled)).not.toHaveCssClass('open');
  });

  xit('should be up if up input is true', () => {
    const html = `<div dropdown [up]="true"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(getDropdownEl(compiled)).toHaveCssClass('dropup');
  });

  xit('should be open initially if open expression is true', () => {
    const html = `<div dropdown [open]="true"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(getDropdownEl(compiled)).toHaveCssClass('dropdown');
    expect(getDropdownEl(compiled)).toHaveCssClass('open');
  });

  it('should toggle open class', () => {
    const html = `<div dropdown [isOpen]="isOpen"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    let dropdownEl = getDropdownEl(compiled);

    expect(dropdownEl).not.toHaveCssClass('open');

    fixture.componentInstance.isOpen = true;
    fixture.detectChanges();

    expect(dropdownEl).toHaveCssClass('open');

    fixture.componentInstance.isOpen = false;
    fixture.detectChanges();

    expect(dropdownEl).not.toHaveCssClass('open');
  });

  it('should allow toggling dropdown from outside', () => {
    const html = `
      <button (click)="drop.show(); $event.stopPropagation()">Open</button>
      <button (click)="drop.hide(); $event.stopPropagation()">Close</button>
      <button (click)="drop.toggle(); $event.stopPropagation()">Toggle</button>
      <div dropdown #drop="bs-dropdown"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEls = compiled.querySelectorAll('button');

    buttonEls[0].click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');

    buttonEls[1].click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('open');

    buttonEls[2].click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');

    buttonEls[2].click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('open');
  });

  it('should allow binding to open output', () => {
    const html = `
      <button (click)="drop.toggle(); $event.stopPropagation()">Toggle</button>
      <div dropdown [(isOpen)]="isOpen" #drop="bs-dropdown"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let buttonEl = compiled.querySelector('button');

    expect(fixture.componentInstance.isOpen).toBe(false);

    buttonEl.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.isOpen).toBe(true);

    buttonEl.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.isOpen).toBe(false);
  });

  it('should not raise open events if open state does not change', () => {
    const html = `
      <button (click)="drop.show(); $event.stopPropagation()">Open</button>
      <button (click)="drop.hide(); $event.stopPropagation()">Close</button>
      <div dropdown (isOpenChange)="recordStateChange($event)" #drop="bs-dropdown"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let buttonEls = compiled.querySelectorAll('button');

    expect(fixture.componentInstance.isOpen).toBe(false);
    expect(fixture.componentInstance.stateChanges).toEqual([]);

    buttonEls[1].click();  // close a closed one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(false);
    expect(fixture.componentInstance.stateChanges).toEqual([]);

    buttonEls[0].click();  // open a closed one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(true);
    expect(fixture.componentInstance.stateChanges).toEqual([true]);

    buttonEls[0].click();  // open an opened one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(true);
    expect(fixture.componentInstance.stateChanges).toEqual([true]);

    buttonEls[1].click();  // close an opened one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(false);
    expect(fixture.componentInstance.stateChanges).toEqual([true, false]);
  });
});

xdescribe('bs-dropdown-toggle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [DropdownModule.forRoot()]});
  });

  it('should toggle dropdown on click', () => {
    const html = `
      <div dropdown>
          <button dropdownToggle>Toggle dropdown</button>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    expect(dropdownEl).not.toHaveCssClass('open');
    expect(buttonEl.getAttribute('aria-haspopup')).toBe('true');
    expect(buttonEl.getAttribute('aria-expanded')).toBe('false');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');
    expect(buttonEl.getAttribute('aria-expanded')).toBe('true');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('open');
    expect(buttonEl.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle dropdown on click of child of toggle', () => {
    const html = `
      <div dropdown>
          <button dropdownToggle>
            <span class="toggle">Toggle dropdown</span>
          </button>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let toggleEl = compiled.querySelector('.toggle');

    expect(dropdownEl).not.toHaveCssClass('open');

    toggleEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');

    toggleEl.click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('open');
  });

  it('should close on outside click', () => {
    const html = `<button>Outside</button><div dropdown [isOpen]="true"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('open');
  });

  it('should not close on outside click if autoClose is set to false', () => {
    const html = `<button>Outside</button><div dropdown [isOpen]="true" [autoClose]="false"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');
  });

  it('should close on ESC', () => {
    const html = `
      <div dropdown>
          <button dropdownToggle>Toggle dropdown</button>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');

    fixture.debugElement.query(By.directive(DropdownDirective)).triggerEventHandler('keyup.esc', {});
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('open');
  });

  it('should not close on ESC if autoClose is set to false', () => {
    const html = `
      <div dropdown [autoClose]="false">
          <button dropdownToggle>Toggle dropdown</button>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    buttonEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');

    fixture.debugElement.query(By.directive(DropdownDirective)).triggerEventHandler('keyup.esc', {});
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');
  });

  it('should close on item click if autoClose is set to false', () => {
    const html = `
      <div dropdown [isOpen]="true" [autoClose]="false">
          <button dropdownToggle>Toggle dropdown</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <a class="dropdown-item">Action</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let linkEl = compiled.querySelector('a');

    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');

    linkEl.click();
    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');
  });

  it('should close on item click', () => {
    const html = `
      <div dropdown [isOpen]="true">
          <button dropdownToggle>Toggle dropdown</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <a class="dropdown-item">Action</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let linkEl = compiled.querySelector('a');

    fixture.detectChanges();
    expect(dropdownEl).toHaveCssClass('open');

    linkEl.click();
    fixture.detectChanges();
    expect(dropdownEl).not.toHaveCssClass('open');
  });

  it('should close on other dropdown click', () => {
    const html = `
      <div dropdown>
          <button dropdownToggle>Toggle dropdown 1</button>
          <div class="dropdown-menu">
            <a class="dropdown-item">Action 1</a>
          </div>
      </div>
      <div dropdown>
          <button dropdownToggle>Toggle dropdown 2</button>
          <div class="dropdown-menu">
            <a class="dropdown-item">Action 2</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    const buttonEls = compiled.querySelectorAll('button');
    const dropdownEls = compiled.querySelectorAll('div[dropdown]');

    fixture.detectChanges();
    expect(dropdownEls[0]).not.toHaveCssClass('open');
    expect(dropdownEls[1]).not.toHaveCssClass('open');

    buttonEls[0].click();
    fixture.detectChanges();
    expect(dropdownEls[0]).toHaveCssClass('open');
    expect(dropdownEls[1]).not.toHaveCssClass('open');

    buttonEls[1].click();
    fixture.detectChanges();
    expect(dropdownEls[0]).not.toHaveCssClass('open');
    expect(dropdownEls[1]).toHaveCssClass('open');
  });

  describe('Custom config', () => {
    let config: DropdownConfig;

    beforeEach(() => {
      TestBed.configureTestingModule({imports: [DropdownModule.forRoot()]});
      TestBed.overrideComponent(TestComponent, {set: {template: '<div dropdown></div>'}});
    });

    beforeEach(inject([DropdownConfig], (c: DropdownConfig) => {
      config = c;
      config.up = true;
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;

      expect(getDropdownEl(compiled)).toHaveCssClass('dropup');
    });
  });

  describe('Custom config as provider', () => {
    let config = new DropdownConfig();
    config.up = true;

    beforeEach(() => {
      TestBed.configureTestingModule(
        {imports: [DropdownModule.forRoot()], providers: [{provide: DropdownConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = createTestComponent('<div dropdown></div>');
      fixture.detectChanges();

      const compiled = fixture.nativeElement;

      expect(getDropdownEl(compiled)).toHaveCssClass('dropup');
    });
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  public isOpen: string = false;
  public stateChanges: any[] = [];

  public recordStateChange($event: any): void {
    this.stateChanges.push($event);
    this.isOpen = $event;
  }
}
