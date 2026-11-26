import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableBsVersions, setTheme } from 'ngx-bootstrap/utils';
import { PopoverContainerComponent, PopoverModule } from '../index';

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
  let fixture: ComponentFixture<unknown>;

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

  it('bs5: container bound through its placement input gets the matching classes', () => {
    setTheme('bs5');
    const containerFixture = TestBed.createComponent(PopoverContainerComponent);
    containerFixture.componentRef.setInput('placement', 'left');
    containerFixture.detectChanges();
    fixture = containerFixture;

    const popover: HTMLElement = containerFixture.nativeElement;
    expect(popover.classList).toContain('bs-popover-start');
    expect(popover.classList).toContain('me-2');
  });

  function containerWithPlacement(theme: AvailableBsVersions, placement: string): HTMLElement {
    setTheme(theme);
    const containerFixture = TestBed.createComponent(PopoverContainerComponent);
    containerFixture.componentRef.setInput('placement', placement);
    containerFixture.detectChanges();
    fixture = containerFixture;

    return containerFixture.nativeElement;
  }

  it.each([
    ['bs5', 'top left', 'top', 'start', 'mb-2'],
    ['bs5', 'right bottom', 'end', 'bottom', 'ms-2'],
    ['bs4', 'left top', 'left', 'top', undefined]
  ] as const)('%s: corner placement="%s" is classed by its side %s only', (theme, placement, side, alignment, margin) => {
    const popover = containerWithPlacement(theme, placement);

    expect(popover.classList).toContain(`bs-popover-${side}`);
    expect(popover.classList).toContain(`popover-${side}`);
    expect(popover.classList).toContain(side);
    expect(popover.classList).not.toContain(alignment);
    if (margin) {
      expect(popover.classList).toContain(margin);
    }
  });

  it.each(['bs5', 'bs4'] as const)('%s: placement="auto" starts on top until positioning resolves it', (theme) => {
    const popover = containerWithPlacement(theme, 'auto');

    expect(popover.classList).toContain('bs-popover-top');
    expect(popover.classList).toContain('popover-top');
    expect(popover.classList).toContain('top');
    expect(popover.classList).not.toContain('auto');
    expect(popover.classList).not.toContain('bs-popover-auto');
  });
});
