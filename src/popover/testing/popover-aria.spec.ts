import { ApplicationRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverModule } from '../index';

@Component({
  selector: 'test-popover-aria',
  template: `
    <button id="first" popover="first content">first</button>
    <button id="second" popover="second content">second</button>
    <button id="in-body" popover="body content" container="body">in body</button>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
class TestPopoverAriaComponent {}

// https://github.com/valor-software/ngx-bootstrap/issues/6834
describe('Directives: Popover aria-describedby', () => {
  let fixture: ComponentFixture<TestPopoverAriaComponent>;

  function trigger(triggerId: string): HTMLElement {
    return fixture.nativeElement.querySelector(`#${triggerId}`) as HTMLElement;
  }

  function toggle(triggerId: string): void {
    trigger(triggerId).click();
    fixture.detectChanges();
    TestBed.inject(ApplicationRef).tick();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestPopoverAriaComponent],
      imports: [PopoverModule]
    });
    fixture = TestBed.createComponent(TestPopoverAriaComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    fixture.nativeElement.remove();
  });

  it('opened popover carries the id its trigger refers to in aria-describedby', () => {
    toggle('first');

    const describedBy = trigger('first').getAttribute('aria-describedby');
    const popover = document.querySelector('popover-container');

    expect(describedBy).toMatch(/^ngx-popover-\d+$/);
    expect(popover?.getAttribute('id')).toBe(describedBy);
    expect(document.getElementById(describedBy as string)).toBe(popover);
  });

  it('popover appended to body carries the id its trigger refers to', () => {
    toggle('in-body');

    const describedBy = trigger('in-body').getAttribute('aria-describedby') as string;
    const popover = document.body.querySelector(':scope > popover-container');

    expect(popover).not.toBeNull();
    expect(document.getElementById(describedBy)).toBe(popover);
  });

  it('two open popovers are each described by their own trigger', () => {
    toggle('first');
    toggle('second');

    const first = document.getElementById(trigger('first').getAttribute('aria-describedby') as string);
    const second = document.getElementById(trigger('second').getAttribute('aria-describedby') as string);

    expect(first?.textContent).toContain('first content');
    expect(second?.textContent).toContain('second content');
  });

  it('closing the popover removes aria-describedby from the trigger', () => {
    toggle('first');
    toggle('first');

    expect(document.querySelector('popover-container')).toBeNull();
    expect(trigger('first').hasAttribute('aria-describedby')).toBe(false);
  });
});
