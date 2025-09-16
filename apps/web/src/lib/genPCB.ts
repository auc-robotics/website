import type { Point } from "@/components/Canvas";
import { shuffled } from "@/lib/util";

const DIRS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

// credit to https://codepen.io/tsuhre/details/xgmEPe
export const generatePCBDesign = (width: number, height: number) => {
  const grid = Array.from({ length: height }, () => Array(width).fill(false));

  const isValid = (point: Point) => {
    const [x, y] = point;
    if (!(0 <= x && x < width && 0 <= y && y < height)) return false;
    return !grid[y][x];
  };
  const doesCrossover = (point: Point, dir: Point) => {
    let [x, y] = point;
    let [dx, dy] = dir;
    let s = Math.abs(dx) + Math.abs(dy);
    if (s != 2) return false;
    return grid[y + dy][x] && grid[y][x + dx];
  };

  const findOpenDir = (point: Point) => {
    const dirs = shuffled([
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]);
    const [x, y] = point;
    for (let i = 0; i < dirs.length; i++) {
      const [dx, dy] = dirs[i];
      const [nx, ny] = [x + dx, y + dy];
      if (isValid([nx, ny])) return i;
    }
    return -1;
  };

  const minLength = 4;
  const maxLength = 12;
  const straightness = 5;
  const generateWire = (start: Point) => {
    let points = [start];
    let dir = findOpenDir(start);
    if (dir == -1) return points;

    while (points.length < maxLength) {
      let [px, py] = points[points.length - 1];
      // 1 and 7 should have the same probability
      let ddirs = Math.random() < 0.5 ? [0, 1, 7] : [0, 7, 1];

      let found = false;
      while (ddirs.length > 0) {
        let di = Math.floor(
          Math.pow(Math.random(), straightness) * ddirs.length,
        );
        let ddir = ddirs.splice(di, 1)[0];

        dir = (dir + ddir) % 8;
        let [dx, dy] = DIRS[dir];
        let [nx, ny] = [px + dx, py + dy];
        if (!isValid([nx, ny])) continue;
        if (doesCrossover([px, py], [dx, dy])) continue;

        points.push([nx, ny]);
        grid[ny][nx] = true;
        found = true;
        break;
      }
      if (!found) break;
    }
    return points;
  };

  let wires = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j]) continue;
      wires.push(generateWire([j, i]));
      grid[i][j] = true;
    }
  }

  // filter short wires
  wires = wires.filter((w) => w.length >= minLength);
  // filter randomly
  // wires = wires.filter(() => Math.random() < 0.95);

  return wires;
};
