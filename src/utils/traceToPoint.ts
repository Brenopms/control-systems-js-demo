import { Point, Trace } from "systems-control-js";

export const traceToPoints = <T>(trace: Trace<T>): Point<T>[] => {
  const points = trace?.x.map((x, index) => ({ x: x, y: trace?.y?.[index] }));
  return points;
};
