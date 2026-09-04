// array of post objects
// contract that data/posts.ts has to follow

// ─── HOW TO ADD A PIECE ──────────────────────────────────────────────
//
//   image / video   1. drop the file in  public/posts/<slug>/
//                   2. add one object below with  src: "/posts/<slug>/..."
//
//   p5 / three      1. add  sketches/<sketchId>.js
//                   2. add one line to  sketches/registry.ts
//                   3. add one object below with  sketchId: "<sketchId>"
//
// sketch code lives OUTSIDE public/ so it gets bundled instead of served
// raw, and the registry imports it lazily — a sketch only downloads when
// its blowup actually opens.
//
// `poster` is optional. without one the tile renders a flat colored block
// keyed to the post type, which is the current placeholder state.
// ─────────────────────────────────────────────────────────────────────

import type { Post } from "@/types/post";

export const posts: Post[] = [

  {
    slug: "selfie-1",
    title: "selfie :3",
    date: "2026-07-18",
    description: "webcam grab, run through a threshold filter until it stopped looking like me.",
    ratio: "4:5",
    type: "image",
    src: "/posts/selfie-1/full.png",
  },

  {
    slug: "lps-grid",
    title: "lps grid",
    date: "2026-07-11",
    description: "the littlest pet shop cells, resizing themselves on a loop. mobile was a nightmare.",
    ratio: "1:1",
    type: "p5",
    sketchId: "lps-grid",
  },

  {
    slug: "orbit-study",
    title: "orbit study",
    date: "2026-07-02",
    description: "first three.js thing that didn't immediately crash. drag to spin it.",
    ratio: "16:9",
    type: "three",
    sketchId: "orbit-study",
  },

  {
    slug: "kitchen-loop",
    title: "kitchen loop",
    date: "2026-06-24",
    description: "four seconds of my kitchen at 6am, looped until it reads as a still.",
    ratio: "16:9",
    type: "video",
    src: "/posts/kitchen-loop/clip.mp4",
  },

  {
    slug: "flow-field-2",
    title: "flow field ii",
    date: "2026-06-15",
    description: "perlin noise pushing particles around. click to reseed the field.",
    ratio: "4:5",
    type: "p5",
    sketchId: "flow-field-2",
  },

  {
    slug: "scan-lines",
    title: "scan lines",
    date: "2026-06-03",
    description: "flatbed scanner, moving the paper while it scanned.",
    ratio: "1:1",
    type: "image",
    src: "/posts/scan-lines/full.png",
  },

  {
    slug: "glass-shader",
    title: "glass shader",
    date: "2026-05-27",
    description: "refraction pass i rewrote about nine times. still slightly wrong at the edges.",
    ratio: "1:1",
    type: "three",
    sketchId: "glass-shader",
  },

  {
    slug: "tape-warp",
    title: "tape warp",
    date: "2026-05-19",
    description: "vhs rip, resampled badly on purpose.",
    ratio: "4:5",
    type: "video",
    src: "/posts/tape-warp/clip.mp4",
  },

  {
    slug: "type-specimen",
    title: "type specimen",
    date: "2026-05-08",
    description: "setting times new roman at sizes it was never meant to be set at.",
    ratio: "16:9",
    type: "image",
    src: "/posts/type-specimen/full.png",
  },

  {
    slug: "cellular-1",
    title: "cellular",
    date: "2026-04-30",
    description: "rule 110, drawn one row per frame until it fills the canvas.",
    ratio: "16:9",
    type: "p5",
    sketchId: "cellular-1",
  },

  {
    slug: "point-cloud",
    title: "point cloud",
    date: "2026-04-21",
    description: "lidar scan of my desk. mostly holes, which i decided was the point.",
    ratio: "4:5",
    type: "three",
    sketchId: "point-cloud",
  },

  {
    slug: "screen-test",
    title: "screen test",
    date: "2026-04-09",
    description: "camera pointed at a crt showing the camera. thirty seconds before it fed back.",
    ratio: "1:1",
    type: "video",
    src: "/posts/screen-test/clip.mp4",
  },

];
