import * as getBoundariesModule from '../utils/getBoundaries';
import { preventOverflow } from '../modifiers/preventOverflow';
import { Data, Offsets } from '../models';

const data: Data = {
  instance: {
    target: {
      style: {}
    } as HTMLElement,
    host: {} as HTMLElement
  },
  offsets: {
    target: offsetsFactory({ width: 20, height: 20, left: 15, top: 5 }),
    host: { width: 0, height: 0 }
  },
  options: {
    modifiers: {
      preventOverflow: { enabled: true }
    }
  },
  positionFixed: false,
  placement: 'top',
  placementAuto: false
};

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

describe('preventOverflow', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  function mockGetBoundaries(boundaries: Partial<Offsets>) {
    jest.spyOn(getBoundariesModule, 'getBoundaries').mockReturnValue(boundaries);
  }

  it(`returns the unchanged offsets if not overflowing`, () => {
    mockGetBoundaries(offsetsFactory({ width: 100, height: 100, left: 0, top: 0 }));
    const expectedTargetOffset = { ...data.offsets.target };
    const returnedData = preventOverflow(data);
    expect(returnedData.offsets.target).toEqual(expectedTargetOffset);
  });

  it(`returns adjusted offsets if overflowing left`, () => {
    const boundaryLeft = 20;
    mockGetBoundaries(offsetsFactory({ width: 100, height: 100, left: boundaryLeft, top: 0 }));
    const expectedTargetOffset = { ...data.offsets.target, left: boundaryLeft };
    const returnedData = preventOverflow(data);
    expect(returnedData.offsets.target).toEqual(expectedTargetOffset);
  });

  it(`returns adjusted offsets if overflowing right`, () => {
    mockGetBoundaries(offsetsFactory({ width: 30, height: 100, left: 0, top: 0 }));
    const expectedTargetOffset = { ...data.offsets.target, left: 10 };
    const returnedData = preventOverflow(data);
    expect(returnedData.offsets.target).toEqual(expectedTargetOffset);
  });

  it(`returns adjusted offsets if overflowing upward`, () => {
    const boundaryTop = 15;
    mockGetBoundaries(offsetsFactory({ width: 100, height: 100, left: 0, top: boundaryTop }));
    const expectedTargetOffset = { ...data.offsets.target, top: boundaryTop };
    const returnedData = preventOverflow(data);
    expect(returnedData.offsets.target).toEqual(expectedTargetOffset);
  });

  it(`returns adjusted offsets if overflowing downward`, () => {
    mockGetBoundaries(offsetsFactory({ width: 100, height: 22, left: 0, top: 0 }));
    const expectedTargetOffset = { ...data.offsets.target, top: 2 };
    const returnedData = preventOverflow(data);
    expect(returnedData.offsets.target).toEqual(expectedTargetOffset);
  });
});
