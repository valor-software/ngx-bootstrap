/* tslint:disable:max-file-line-count */
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BsDropdownConfig, BsDropdownModule } from '../dropdown/index';

@Component({
  selector: 'dropdown-test',
  template: ''
})
class TestDropdownComponent {
  isOpen: Boolean = false;
  isDisabled: Boolean = false;
  addToggleClass: Boolean = false;
  autoClose = false;
  keyboardNav: Boolean = false;

  constructor(config: BsDropdownConfig) {
    Object.assign(this, config);
  }
}

const defaultHtml = `
  <div dropdown>
    <button dropdownToggle>Dropdown</button>
    <ul *dropdownMenu>
      <li><a href="#">One</a></li>
      <li><a href="#">Two</a></li>
    </ul>
  </div>
`;

const htmlWithBinding = `
  <div dropdown [(isOpen)]="isOpen">
    <button dropdownToggle>Dropdown</button>
    <ul *dropdownMenu>
      <li><a href="#">One</a></li>
      <li><a href="#">Two</a></li>
    </ul>
  </div>
`;

describe('Directive: Dropdown', () => {
  it('should be closed by default', () => {
    TestBed.configureTestingModule({
      declarations: [TestDropdownComponent],
      imports: [BsDropdownModule.forRoot()]
    });
    TestBed.overrideComponent(TestDropdownComponent, {
      set: {template: defaultHtml}
    });
    const fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  it('should be opened if isOpen === true and toggle on isOpen changes', () => {
    TestBed.configureTestingModule({
      declarations: [TestDropdownComponent],
      imports: [BsDropdownModule.forRoot()]
    });
    TestBed.overrideComponent(TestDropdownComponent, {
      set: {template: htmlWithBinding}
    });
    const fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const context = fixture.componentInstance;
    context.isOpen = true;
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    context.isOpen = false;
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    context.isOpen = true;
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
  });

  it('should toggle by click', () => {
    TestBed.configureTestingModule({
      declarations: [TestDropdownComponent],
      imports: [BsDropdownModule.forRoot()]
    });
    TestBed.overrideComponent(TestDropdownComponent, {
      set: {template: defaultHtml}
    });
    const fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  it('should be closed if was opened by click and then isOpen === false was set', () => {
    TestBed.configureTestingModule({
      declarations: [TestDropdownComponent],
      imports: [BsDropdownModule.forRoot()]
    });
    TestBed.overrideComponent(TestDropdownComponent, {
      set: {template: htmlWithBinding}
    });
    const fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const context = fixture.componentInstance;
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    context.isOpen = false;
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  it(
    'should change and update isOpen when it is opened or closed',
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestDropdownComponent],
        imports: [BsDropdownModule.forRoot()]
      });
      TestBed.overrideComponent(TestDropdownComponent, {
        set: {template: htmlWithBinding}
      });
      const fixture = TestBed.createComponent(TestDropdownComponent);
      fixture.detectChanges();
      tick();
      const element = fixture.nativeElement;
      const context = fixture.componentInstance;
      fixture.detectChanges();
      element.querySelector('button').click();
      fixture.detectChanges();
      expect(element.querySelector('[dropdown]').classList).toContain('open');
      expect(context.isOpen).toBe(true);
      tick();
      element.querySelector('li').click();
      fixture.detectChanges();
      expect(element.querySelector('[dropdown]').classList).not.toContain(
        'open'
      );
      expect(context.isOpen).toBe(false);
    })
  );

  it(
    'should close by click on nonInput menu item',
    fakeAsync(() => {
      const html = `
      <div dropdown>
        <button dropdownToggle>Dropdown</button>
        <ul *dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
      TestBed.configureTestingModule({
        declarations: [TestDropdownComponent],
        imports: [BsDropdownModule.forRoot()]
      });
      TestBed.overrideComponent(TestDropdownComponent, {
        set: {template: html}
      });
      const fixture = TestBed.createComponent(TestDropdownComponent);
      fixture.detectChanges();
      tick();
      const element = fixture.nativeElement;
      fixture.detectChanges();
      element.querySelector('button').click();
      fixture.detectChanges();
      tick();
      expect(element.querySelector('[dropdown]').classList).toContain('open');
      element.querySelector('li').click();
      fixture.detectChanges();
      expect(element.querySelector('[dropdown]').classList).not.toContain(
        'open'
      );
    })
  );

  xit(
    'should not close by click on input or textarea menu item',
    fakeAsync(() => {
      const html = `
      <div dropdown>
        <button dropdownToggle>Dropdown</button>
        <ul *dropdownMenu>
          <li><input type="text"></li>
          <li><textarea>dropdown</textarea></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
      TestBed.configureTestingModule({
        declarations: [TestDropdownComponent],
        imports: [BsDropdownModule.forRoot()]
      });
      TestBed.overrideComponent(TestDropdownComponent, {
        set: {template: html}
      });
      const fixture = TestBed.createComponent(TestDropdownComponent);
      fixture.detectChanges();
      tick();
      const element = fixture.nativeElement;
      fixture.detectChanges();
      element.querySelector('button').click();
      fixture.detectChanges();
      expect(element.querySelector('[dropdown]').classList).toContain('open');
      element.querySelector('input').click();
      fixture.detectChanges();
      expect(element.querySelector('[dropdown]').classList).toContain('open');
      element.querySelector('textarea').click();
      fixture.detectChanges();
      expect(element.querySelector('[dropdown]').classList).toContain('open');
    })
  );

  it(
    'should not close by click on menu item if autoClose === false',
    fakeAsync(() => {
      const html = `
      <div dropdown [autoClose]="autoClose">
        <button dropdownToggle>Dropdown</button>
        <ul *dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
      TestBed.configureTestingModule({
        declarations: [TestDropdownComponent],
        imports: [BsDropdownModule.forRoot()]
      });
      TestBed.overrideComponent(TestDropdownComponent, {
        set: {template: html}
      });
      const fixture = TestBed.createComponent(TestDropdownComponent);
      fixture.detectChanges();
      const element = fixture.nativeElement;
      const context = fixture.componentInstance;
      context.autoClose = false;
      tick();
      fixture.detectChanges();
      element.querySelector('button').click();
      fixture.detectChanges();
      expect(element.querySelector('[dropdown]').classList).toContain('open');
      tick();
      element.querySelector('li').click();
      fixture.detectChanges();
      expect(element.querySelector('[dropdown]').classList).toContain('open');
    })
  );

  xit('should close by click on input in menu if autoClose === always', () => {
    const html = `
      <div dropdown [autoClose]="autoClose">
        <button dropdownToggle>Dropdown</button>
        <ul *dropdownMenu>
          <li><input type="text"></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
    TestBed.configureTestingModule({
      declarations: [TestDropdownComponent],
      imports: [BsDropdownModule.forRoot()]
    });
    TestBed.overrideComponent(TestDropdownComponent, {
      set: {template: html}
    });
    const fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const context = fixture.componentInstance;
    context.autoClose = true;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    element.querySelector('input').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  xit('should close by click on any element outside the dropdown', () => {
    const html = `
      <div dropdown>
        <button dropdownToggle>Dropdown</button>
        <ul *dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
      <span>outside</span>
    `;
    TestBed.configureTestingModule({
      declarations: [TestDropdownComponent],
      imports: [BsDropdownModule.forRoot()]
    });
    TestBed.overrideComponent(TestDropdownComponent, {
      set: {template: html}
    });
    const fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const context = fixture.componentInstance;
    context.autoClose = true;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    element.querySelector('li').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    element.querySelector('span').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  xit(
    'should enable navigation of dropdown list elements with the arrow keys if keyboardNav is true',
    () => {
      const html = `
      <div dropdown [keyboardNav]="keyboardNav">
        <button dropdownToggle>Dropdown</button>
        <ul *dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
      TestBed.configureTestingModule({
        declarations: [TestDropdownComponent],
        imports: [BsDropdownModule.forRoot()]
      });
      TestBed.overrideComponent(TestDropdownComponent, {
        set: {template: html}
      });
      const fixture = TestBed.createComponent(TestDropdownComponent);
      fixture.detectChanges();
      const element = fixture.nativeElement;
      const context = fixture.componentInstance;
      context.keyboardNav = true;
      fixture.detectChanges();
      element.querySelector('button').click();
      fixture.detectChanges();
      expect(element.querySelector('[dropdown]').classList).toContain('open');
      // todo: emulate keypress, check if item has hover
    }
  );
});
describe('Directive: dropdownToggle', () => {
  it('should not open if toggle isDisabled', () => {
    const html = `
      <div dropdown [isDisabled]="isDisabled">
        <button dropdownToggle>Dropdown</button>
        <ul *dropdownMenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
        </ul>
      </div>
    `;
    TestBed.configureTestingModule({
      declarations: [TestDropdownComponent],
      imports: [BsDropdownModule.forRoot()]
    });
    TestBed.overrideComponent(TestDropdownComponent, {
      set: {template: html}
    });
    const fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const context = fixture.componentInstance;
    context.isDisabled = true;
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    context.isDisabled = false;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
  });
});
