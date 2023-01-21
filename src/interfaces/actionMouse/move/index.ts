import { Point } from '@nut-tree/nut-js'

export interface IGetMouseMove {
  (direction: Point[] | Promise<Point[]>): void;
}
