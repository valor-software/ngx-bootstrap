/* tslint:disable:max-file-line-count */
import { Component, DebugElement } from '@angular/core';
import { fakeAsync, TestBed, tick, ComponentFixture, waitForAsync } from '@angular/core/testing';

import { BsDropdownConfig, BsDropdownDirective, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { window } from '../utils/facade/browser';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'dropdown-test',
  template: ''
})
class TestDropdownComponent {
  isOpen: Boolean = false;
  dropup: Boolean = false;
  isDisabled: Boolean = false;
  autoClose: Boolean = true;
  isOpenChangeValue: Boolean = false;
  insideClick: Boolean = false;
  container: String = '';
  placement: String = '';

  constructor(config: BsDropdownConfig) {
    Object.assign(this, config);
  }
}

const defaultHtml = `
  <div dropdown [(isDisabled)]="isDisabled"
                [(dropup)]="dropup"
                (isOpenChange)="isOpenChangeValue = true"
                [(isOpen)]="isOpen"
                [(insideClick)]="insideClick"
                [(autoClose)]="autoClose">
    <button aria-expanded = "false" dropdownToggle class="dropdown-toggle">Dropdown</button>
    <ul *dropdownMenu>
      <li><a href="#">One</a></li>
      <li><a href="#">Two</a></li>
      <li>Three</li>
    </ul>
  </div>
  <h1>Title outside dropdown</h1>
`;

describe('Directive: Dropdown', () => {
  let fixture: ComponentFixture<TestDropdownComponent>;
  let element: HTMLElement;
  let context: TestDropdownComponent;
  let directive: BsDropdownDirective;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestDropdownComponent],
      imports: [
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule
      ]
    });
    TestBed.overrideComponent(TestDropdownComponent, {
      set: {template: defaultHtml}
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TestDropdownComponent);
    element = fixture.nativeElement;
    context = fixture.componentInstance;
    // get the typeahead directive instance
    const inputs = fixture.debugElement.queryAll(
      By.directive(BsDropdownDirective)
    );
    directive = inputs.map(
      (de: DebugElement) =>
        de.injector.get<BsDropdownDirective>(BsDropdownDirective)
    )[0];
    fixture.detectChanges();
  });

  it('should be closed by default', () => {
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  it('autoClose value should be true by default', () => {
    expect(directive.autoClose).toBeTruthy();
  });

  it('insideClick value should be true by default', () => {
    expect(directive.insideClick).toBeFalsy();
  });

  it('should be opened if isOpen === true and toggle on isOpen changes', () => {
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
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  it('should be closed if was opened by click and then isOpen === false was set', () => {
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    context.isOpen = false;
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  it('should close by click on any element inside the dropdown', fakeAsync(() => {
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.querySelector('li').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');

    tick();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  }));

  it('should close by click on any element outside the dropdown', () => {
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    element.querySelector('h1').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  it('should be opened if isOpen === true and toggle on isOpen changes', () => {
    context.isOpen = true;
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    context.isOpen = false;
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  it('should change and update isOpen when it is opened or closed', fakeAsync(() => {
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
  }));

  it('should has class dropup if property dropup equal true', () => {
    context.dropup = true;
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('dropup');
  });

  it('should not open if isDisabled equal true', () => {
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

  it('should close if only dropdown button was clicked if autoClose equal false', fakeAsync(() => {
    context.autoClose = false;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    tick();

    element.querySelector('h1').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  }));

  it('should not close by click on menu item if autoClose equal true', fakeAsync(() => {
    context.autoClose = true;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.querySelector('li').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  }));

  it('value isOpenChange emits event', () => {
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    expect(context.isOpenChangeValue).toBeTruthy();
  });

  it('should close if only dropdown button was clicked if autoClose equal false', fakeAsync(() => {
    context.autoClose = false;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.querySelector('h1').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  }));

  it('should not close by click on menu item if insideClick equal true', fakeAsync(() => {
    context.insideClick = true;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.querySelector('li').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.querySelector('ul').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');

    tick();
    element.querySelector('h1').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  }));

  it('should close by click on menu item if insideClick equal false', fakeAsync(() => {
    context.insideClick = false;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    tick();
    element.querySelector('li').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  }));

  it('should close by click on menu item if insideClick equal false', fakeAsync(() => {
    context.insideClick = false;
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    tick();
    element.querySelector('li').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  }));

  it('should change aria-expanded property, when dropdown was opened', fakeAsync(() => {
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    expect(element.querySelector('[dropdownToggle]').getAttribute('aria-expanded')).toEqual('true');
    tick();
    element.querySelector('li').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdownToggle]').getAttribute('aria-expanded')).toEqual('false');
  }));

  it('should change disabled property, when dropdown was opened', fakeAsync(() => {
    context.isDisabled = true;
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    expect(element.querySelector('[dropdownToggle]').getAttribute('disabled')).toEqual('true');
  }));

  it('should open if container is body', () => {
    context.container = 'body';
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
  });

  it('should open if isBs3 method return true', fakeAsync(() => {
    context.placement = 'bottom';
    const tempVal = window.__theme;
    window.__theme = 'bs4';
    fixture.detectChanges();
    element.querySelector('button').click();
    fixture.detectChanges();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    expect(element.querySelector('[dropdownToggle]').getAttribute('aria-expanded')).toEqual('true');
    tick();
    expect(element.querySelector('[dropdown]').classList).toContain('open');
    window.__theme = tempVal;
  }));
});
