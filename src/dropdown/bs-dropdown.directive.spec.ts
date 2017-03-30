/* tslint:disable:max-file-line-count */
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BsDropdownConfig, BsDropdownModule } from './';

const defaultHtml = `
  <div dropdown>
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
    TestBed.overrideComponent(TestDropdownComponent, {set: {template: defaultHtml}});
    let fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.querySelector('.dropdown').classList).not.toContain('open');
  });

  it('should be opened if isOpen === true and toggle on isOpen changes', () => {
    const html = `
      <div dropdown [(isOpen)]="isOpen">
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
    TestBed.overrideComponent(TestDropdownComponent, {set: {template: html}});
    let fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const context = fixture.componentInstance;
    context.isOpen = true;
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
    context.isOpen = false;
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).not.toContain('open');
    context.isOpen = true;
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
  });

  it('should toggle by click', () => {
    TestBed.configureTestingModule({
      declarations: [TestDropdownComponent],
      imports: [BsDropdownModule.forRoot()]
    });
    TestBed.overrideComponent(TestDropdownComponent, {set: {template: defaultHtml}});
    let fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.querySelector('.dropdown').classList).not.toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).not.toContain('open');
  });

  it('should close by click on nonInput menu item', fakeAsync(() => {
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
    TestBed.overrideComponent(TestDropdownComponent, {set: {template: html}});
    let fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
    element.querySelector('li').click();
    tick();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).not.toContain('open');
  }));

  it('should not close by click on input or textarea menu item', () => {
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
    TestBed.overrideComponent(TestDropdownComponent, {set: {template: html}});
    let fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
    element.querySelector('input').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
    element.querySelector('textarea').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
  });

  it('should not close by click on menu item if autoClose === disabled', () => {
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
    TestBed.overrideComponent(TestDropdownComponent, {set: {template: html}});
    let fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const context = fixture.componentInstance;
    context.autoClose = 'disabled';
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
    element.querySelector('li').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
  });

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
    TestBed.overrideComponent(TestDropdownComponent, {set: {template: html}});
    let fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const context = fixture.componentInstance;
    context.autoClose = 'always';
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
    element.querySelector('input').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).not.toContain('open');
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
    TestBed.overrideComponent(TestDropdownComponent, {set: {template: html}});
    let fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const context = fixture.componentInstance;
    context.autoClose = 'outsideClick';
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
    element.querySelector('li').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
    element.querySelector('span').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).not.toContain('open');
  });

  xit('should enable navigation of dropdown list elements with the arrow keys if keyboardNav is true', () => {
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
    TestBed.overrideComponent(TestDropdownComponent, {set: {template: html}});
    let fixture = TestBed.createComponent(TestDropdownComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const context = fixture.componentInstance;
    context.keyboardNav = true;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('.dropdown').classList).toContain('open');
    // todo: emulate keypress, check if item has hover
  });

  describe('Directive: dropdownToggle', () => {
    it('should not open if toggle isDisabled', () => {
      const html = `
      <div dropdown>
        <button dropdownToggle [isDisabled]="isDisabled">Dropdown</button>
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
      TestBed.overrideComponent(TestDropdownComponent, {set: {template: html}});
      let fixture = TestBed.createComponent(TestDropdownComponent);
      fixture.detectChanges();
      const element = fixture.nativeElement;
      const context = fixture.componentInstance;
      context.isDisabled = true;
      fixture.detectChanges();
      expect(element.querySelector('.dropdown').classList).not.toContain('open');
      element.querySelector('button').click();
      fixture.detectChanges();
      expect(element.querySelector('.dropdown').classList).not.toContain('open');
      context.isDisabled = false;
      fixture.detectChanges();
      element.querySelector('button').click();
      fixture.detectChanges();
      expect(element.querySelector('.dropdown').classList).toContain('open');
    });

    it('should have dropdown-toggle class by default', () => {
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
      TestBed.overrideComponent(TestDropdownComponent, {set: {template: html}});
      let fixture = TestBed.createComponent(TestDropdownComponent);
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelector('button').classList).toContain('dropdown-toggle');
    });

    it('should not add dropdown-toggle class if addToggleClass is false', () => {
      const html = `
      <div dropdown>
        <button dropdownToggle [addToggleClass]="addToggleClass">Dropdown</button>
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
      TestBed.overrideComponent(TestDropdownComponent, {set: {template: html}});
      let fixture = TestBed.createComponent(TestDropdownComponent);
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelector('button').classList).not.toContain('dropdown-toggle');
    });
  });
});

@Component({
  selector: 'dropdown-test',
  template: ''
})

class TestDropdownComponent {
  public isOpen: Boolean = false;
  public isDisabled: Boolean = false;
  public addToggleClass: Boolean = false;
  public autoClose: string = 'nonInput';
  public keyboardNav: Boolean = false;

  public constructor(config: BsDropdownConfig) {
    Object.assign(this, config);
  }
}
