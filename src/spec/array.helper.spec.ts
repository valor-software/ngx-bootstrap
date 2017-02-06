/* tslint:disable:no-unused-variable */

import { ArrayHelper } from '../sortable/array.helper';

describe('Helper: ArrayHelper', () => {
  let array = [];

  beforeEach(() => {
    array = [1, 2, 3, 4, 5];
  });

  it('should swap first and second item', () => {
    // arrange
    // act
    const result = ArrayHelper.moveElement(0, 1, array);
    // assert
    expect(result).toEqual([2, 1, 3, 4, 5]);
  });

  it('should move first to the end', () => {
    // arrange
    // act
    const result = ArrayHelper.moveElement(0, 4, array);
    // assert
    expect(result).toEqual([2, 3, 4, 5, 1]);
  });

  it('should move third item to the begining', () => {
    // arrange
    // act
    const result = ArrayHelper.moveElement(2, 0, array);
    // assert
    expect(result).toEqual([3, 1, 2, 4, 5]);
  });

  it('should NOT move any item', () => {
    // arrange
    // act
    const result = ArrayHelper.moveElement(2, 2, array);
    // assert
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should insert item into the begining', () => {
    // arrange
    // act
    const result = ArrayHelper.insertElement(0, 0, array);
    // assert
    expect(result).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('should insert item into the end', () => {
    // arrange
    // act
    const result = ArrayHelper.insertElement(5, 0, array);
    // assert
    expect(result).toEqual([1, 2, 3, 4, 5, 0]);
  });

  it('should insert item into the middle', () => {
    // arrange
    // act
    const result = ArrayHelper.insertElement(2, 0, array);
    // assert
    expect(result).toEqual([1, 2, 0, 3, 4, 5]);
  });

  it('should insert item into the empty array', () => {
    // arrange
    // act
    const result = ArrayHelper.insertElement(0, 0, []);
    // assert
    expect(result).toEqual([ 0 ]);
  });

  it('should move element from end to begining', () => {
    // arrange
    // act
    const result = ArrayHelper.moveElementThroughFixed(4, 0, array, undefined);
    // assert
    expect(result).toEqual([5, 1, 2, 3, 4]);
  });

  it('should move element from the begining the to end', () => {
    // arrange
    // act
    const result = ArrayHelper.moveElementThroughFixed(0, 4, array, undefined);
    // assert
    expect(result).toEqual([2, 3, 4, 5, 1]);
  });

  it('should move element through fixed items', () => {
    // arrange
    // act
    const result = ArrayHelper.moveElementThroughFixed(0, 4, array, [1, 2, 3]);
    // assert
    expect(result).toEqual([5, 2, 3, 4, 1]);
  });

  it('should move element from the begining to the end through fixed items', () => {
    // arrange
    // act
    const result = ArrayHelper.moveElementThroughFixed(0, 4, array, [1, 3]);
    // assert
    expect(result).toEqual([3, 2, 5, 4, 1]);
  });

  it('should move element from the end to the begining through fixed items', () => {
    // arrange
    // act
    const result = ArrayHelper.moveElementThroughFixed(4, 0, array, [1, 3]);
    // assert
    expect(result).toEqual([5, 2, 1, 4, 3]);
  });

  it('should move element from the end to the middle through fixed items', () => {
    // arrange
    // act
    const result = ArrayHelper.moveElementThroughFixed(4, 1, array, [3]);
    // assert
    expect(result).toEqual([1, 5, 2, 4, 3]);
  });

  it('should move element from the 1 to 5 through fixed items', () => {
    // arrange
    let bigArray = Array(12).fill(0).map((x: any, i: number) => i);
    // act
    const result = ArrayHelper.moveElementThroughFixed(1, 5, bigArray, [0, 4, 6, 7]);
    // assert
    expect(result).toEqual([0, 2, 3, 5, 4, 1, 6, 7, 8, 9, 10, 11]);
  });

  it('should move element from 1 to 2 through fixed items', () => {
    // arrange
    let bigArray = Array(12).fill(0).map((x: any, i: number) => i);
    // act
    const result = ArrayHelper.moveElementThroughFixed(1, 2, bigArray, [0, 4, 6, 7]);
    // assert
    expect(result).toEqual([0, 2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it('should move element from 9 to 5 through fixed items', () => {
    // arrange
    let bigArray = Array(12).fill(0).map((x: any, i: number) => i);
    // act
    const result = ArrayHelper.moveElementThroughFixed(9, 5, bigArray, [0, 4, 6, 7]);
    // assert
    expect(result).toEqual([0, 1, 2, 3, 4, 9, 6, 7, 5, 8, 10, 11]);
  });

  it('should NOT change an array if start and end positions are same', () => {
    // arrange
    let bigArray = Array(12).fill(0).map((x: any, i: number) => i);
    // act
    const result = ArrayHelper.moveElementThroughFixed(5, 5, bigArray, [0, 4, 6, 7]);
    // assert
    expect(result).toBe(bigArray);
  });

  it('should NOT change an array if start position is fixed', () => {
    // arrange
    let bigArray = Array(12).fill(0).map((x: any, i: number) => i);
    // act
    const result = ArrayHelper.moveElementThroughFixed(4, 5, bigArray, [0, 4, 6, 7]);
    // assert
    expect(result).toBe(bigArray);
  });

  it('should NOT change an array if end position is fixed', () => {
    // arrange
    let bigArray = Array(12).fill(0).map((x: any, i: number) => i);
    // act
    const result = ArrayHelper.moveElementThroughFixed(5, 7, bigArray, [0, 4, 6, 7]);
    // assert
    expect(result).toBe(bigArray);
  });
});
