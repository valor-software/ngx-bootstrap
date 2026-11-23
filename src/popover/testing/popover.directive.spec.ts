import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableBsVersions, setTheme } from 'ngx-bootstrap/utils';
import { PopoverModule } from '../index';

@Component({
  selector: 'test-popover',
  template: `
    <button id="top" popover="content" popoverTitle="title" placement="top">top</button>
    <button id="right" popover="content" popoverTitle="title" placement="right">right</button>
    <button id="bottom" popover="content" popoverTitle="title" placement="bottom">bottom</button>
    <button id="left" popover="content" popoverTitle="title" placement="left">left</button>
    <button id="default" popover="content" popoverTitle="title">default</button>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
class TestPopoverComponent {}

describe('Directives: Popover placement', () => {
  let fixture: ComponentFixture<TestPopoverComponent>;

  function openPopover(theme: AvailableBsVersions, triggerId: string): HTMLElement {
    setTheme(theme);
    TestBed.configureTestingModule({
      declarations: [TestPopoverComponent],
      imports: [PopoverModule]
    });
    fixture = TestBed.createComponent(TestPopoverComponent);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    (host.querySelector(`#${triggerId}`) as HTMLElement).click();
    fixture.detectChanges();

    return host.querySelector('popover-container') as HTMLElement;
  }

  afterEach(() => {
    fixture.destroy();
    setTheme('bs5');
  });

  // https://github.com/valor-software/ngx-bootstrap/issues/6838
  it.each([
    ['top', 'top', 'mb-2'],
    ['right', 'end', 'ms-2'],
    ['bottom', 'bottom', 'mt-2'],
    ['left', 'start', 'me-2']
  ])('bs5: placement="%s" gets the %s placement classes and the %s margin', (placement, side, margin) => {
    const popover = openPopover('bs5', placement);

    expect(popover.classList).toContain(`bs-popover-${side}`);
    expect(popover.classList).toContain(`popover-${side}`);
    expect(popover.classList).toContain(margin);

    const otherMargins = ['mb-2', 'ms-2', 'mt-2', 'me-2'].filter((cls) => cls !== margin);
    otherMargins.forEach((cls) => expect(popover.classList).not.toContain(cls));
  });

  it('bs5: popover without a placement is placed on top', () => {
    const popover = openPopover('bs5', 'default');

    expect(popover.classList).toContain('bs-popover-top');
    expect(popover.classList).toContain('mb-2');
  });

  it.each(['right', 'left', 'bottom'])('bs4: placement="%s" keeps the bs4 class name and adds no margin', (placement) => {
    const popover = openPopover('bs4', placement);

    expect(popover.classList).toContain(`bs-popover-${placement}`);
    expect(popover.classList).not.toContain('bs-popover-top');
    ['mb-2', 'ms-2', 'mt-2', 'me-2'].forEach((cls) => expect(popover.classList).not.toContain(cls));
  });

  it('shows the title and content passed to the directive', () => {
    const popover = openPopover('bs5', 'right');

    expect(popover.querySelector('.popover-header')?.textContent).toBe('title');
    expect(popover.querySelector('.popover-body')?.textContent?.trim()).toBe('content');
  });
});
