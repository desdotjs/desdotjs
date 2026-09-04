// sketchId -> lazy import. a sketch only downloads when its blowup opens,
// so none of this is in the initial bundle.
//
// to add a p5 piece:
//   1. sketches/<sketchId>.js, default-exporting an instance-mode sketch
//   2. one line below
//   3. one object in data/posts.ts with  sketchId: "<sketchId>"
//
// three.js pieces are NOT wired yet — three isn't installed. run
// `npm install three`, then register them here exactly the same way.
// until then a three post opens its blowup and shows the flat
// placeholder block instead of a canvas.

import type p5 from "p5";

export type Sketch = (p: p5) => void;

export const sketches: Record<string, () => Promise<{ default: Sketch }>> = {

  "lps-grid": () => import("./lps-grid"),
  "flow-field-2": () => import("./flow-field-2"),
  "cellular-1": () => import("./cellular-1"),

};
