import * as getBoundariesModule from '../utils/getBoundaries';
import { computeAutoPlacement } from '../utils/computeAutoPlacement';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Offsets } from '../models';

@Component({
  selector: 'test-cmp',
  template: `<span>Popover demo</span>`,
  standalone: false
})
class TestComponent {}

function getSpanElement(fixture: ComponentFixture<TestComponent>): HTMLElement {
  return fixture.nativeElement.querySelector('span') as HTMLElement;
}

function offsetsFactory({
  width,
  height,
  left,
  top
}: {
  width: number;
  height: number;
  left: number;
  top: number;
}): Offsets {
  return { width, height, left, right: left + width, top, bottom: top + height };
}

describe('computeAutoPlacement', () => {
  const host: HTMLElement = document.createElement('div');
  let fixture: ComponentFixture<TestComponent>;
  let target: HTMLElement;

  beforeEach(
    waitForAsync(() =>
      TestBed.configureTestingModule({
        declarations: [TestComponent]
      }).compileComponents()
    )
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    target = getSpanElement(fixture);
    jest.spyOn(target, 'clientWidth', 'get').mockImplementation(() => 20);
    jest.spyOn(target, 'clientHeight', 'get').mockImplementation(() => 10);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  function mockGetBoundaries(boundaries: Partial<Offsets>) {
    jest.spyOn(getBoundariesModule, 'getBoundaries').mockReturnValue(boundaries);
  }

  function prepareSpaceOnlyOnTheRight(): Offsets {
    mockGetBoundaries(offsetsFactory({ width: 100, height: 20, left: 0, top: 0 }));
    return offsetsFactory({ width: 20, height: 20, left: 15, top: 5 });
  }

  function prepareSpaceAroundMostlyOnTop(): Offsets {
    mockGetBoundaries(offsetsFactory({ width: 100, height: 100, left: 0, top: 0 }));
    return offsetsFactory({ width: 20, height: 20, left: 40, top: 50 });
  }

  function prepareSpaceAroundMostlyOnTheRight(): Offsets {
    mockGetBoundaries(offsetsFactory({ width: 100, height: 100, left: 0, top: 0 }));
    return offsetsFactory({ width: 20, height: 20, left: 20, top: 40 });
  }

  function prepareSpaceAroundMostlyOnTheBottom(): Offsets {
    mockGetBoundaries(offsetsFactory({ width: 100, height: 100, left: 0, top: 0 }));
    return offsetsFactory({ width: 20, height: 20, left: 40, top: 10 });
  }

  function prepareSpaceAroundMostlyOnTheLeft(): Offsets {
    mockGetBoundaries(offsetsFactory({ width: 100, height: 100, left: 0, top: 0 }));
    return offsetsFactory({ width: 20, height: 20, left: 65, top: 40 });
  }

  it(`returns the provided placement if it is not 'auto'`, () => {
    const providedPlacement = 'top';
    const refRect: Offsets = { width: 100, height: 100 };
    const computedPlacement = computeAutoPlacement(providedPlacement, refRect, target, host);
    expect(computedPlacement).toBe(providedPlacement);
  });

  it('uses the provided placement variation', () => {
    const refRect = prepareSpaceAroundMostlyOnTheBottom();
    const computedPlacement = computeAutoPlacement('auto left', refRect, target, host);
    expect(computedPlacement).toBe('bottom-left');
  });

  it('chooses only among the allowed positions', () => {
    const refRect = prepareSpaceAroundMostlyOnTop();
    const computedPlacement = computeAutoPlacement('auto', refRect, target, host, ['right']);
    expect(computedPlacement).toBe('right');
  });

  it('chooses placement on top if it provides the biggest area', () => {
    const refRect = prepareSpaceAroundMostlyOnTop();
    const computedPlacement = computeAutoPlacement('auto', refRect, target, host);
    expect(computedPlacement).toBe('top');
  });

  it('chooses placement on the right if it provides the biggest area', () => {
    const refRect = prepareSpaceAroundMostlyOnTheRight();
    const computedPlacement = computeAutoPlacement('auto', refRect, target, host);
    expect(computedPlacement).toBe('right');
  });

  it('chooses placement on the bottom if it provides the biggest area', () => {
    const refRect = prepareSpaceAroundMostlyOnTheBottom();
    const computedPlacement = computeAutoPlacement('auto', refRect, target, host);
    expect(computedPlacement).toBe('bottom');
  });

  it('chooses placement on the left if it provides the biggest area', () => {
    const refRect = prepareSpaceAroundMostlyOnTheLeft();
    const computedPlacement = computeAutoPlacement('auto', refRect, target, host);
    expect(computedPlacement).toBe('left');
  });

  it('chooses the correct placement if only one is possible', () => {
    const refRect = prepareSpaceOnlyOnTheRight();
    const computedPlacement = computeAutoPlacement('auto', refRect, target, host);
    expect(computedPlacement).toBe('right');
  });
});
