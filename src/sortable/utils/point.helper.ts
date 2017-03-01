import { Point } from '../models/point.class';

export class PointHelper {
  public static isPointInRectangle(point: Point, rectangle: ClientRect) {
    return point.x >= rectangle.left &&
      point.x <= rectangle.right &&
      point.y >= rectangle.top &&
      point.y <= rectangle.bottom;
  }
}
