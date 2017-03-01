/* tslint:disable:no-unused-variable */

import { PointHelper } from '../sortable/point.helper';

describe('Helper: PointHelper', () => {
  let rectangle: ClientRect;

  beforeEach(() => {
    rectangle = { top: 10, right: 205, bottom: 310, left: 5, width: 200, height: 300 };
  });

  it('should return false if the point above the rectangle', () => {
    // arrange
    // act
    const result = PointHelper.isPointInRectangle({ x: 10, y: 5 }, rectangle);
    // assert
    expect(result).toBe(false);
  });

  it('should return false if the point below the rectangle', () => {
    // arrange
    // act
    const result = PointHelper.isPointInRectangle({ x: 15, y: 315 }, rectangle);
    // assert
    expect(result).toBe(false);
  });

  it('should return false if the point on the left from the rectangle', () => {
    // arrange
    // act
    const result = PointHelper.isPointInRectangle({ x: 1, y: 50 }, rectangle);
    // assert
    expect(result).toBe(false);
  });

  it('should return false if the point on the right from the rectangle', () => {
    // arrange
    // act
    const result = PointHelper.isPointInRectangle({ x: 210, y: 50 }, rectangle);
    // assert
    expect(result).toBe(false);
  });

  it('should return true if the point belongs the rectangle', () => {
    // arrange
    // act
    const result = PointHelper.isPointInRectangle({ x: 100, y: 100 }, rectangle);
    // assert
    expect(result).toBe(true);
  });

  it('should return true if the point belongs the rectangle\'s top border', () => {
    // arrange
    // act
    const result = PointHelper.isPointInRectangle({ x: 15, y: 10 }, rectangle);
    // assert
    expect(result).toBe(true);
  });

  it('should return true if the point belongs the rectangle\'s bottom border', () => {
    // arrange
    // act
    const result = PointHelper.isPointInRectangle({ x: 15, y: 310 }, rectangle);
    // assert
    expect(result).toBe(true);
  });

  it('should return true if the point belongs the rectangle\'s left border', () => {
    // arrange
    // act
    const result = PointHelper.isPointInRectangle({ x: 5, y: 30 }, rectangle);
    // assert
    expect(result).toBe(true);
  });

  it('should return true if the point belongs the rectangle\'s right border', () => {
    // arrange
    // act
    const result = PointHelper.isPointInRectangle({ x: 205, y: 30 }, rectangle);
    // assert
    expect(result).toBe(true);
  });
});
