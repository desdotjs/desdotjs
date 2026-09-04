// post interface / shape

// the three media ratios allowed on the site
export type Ratio = "4:5" | "16:9" | "1:1";

// fields every post has, no matter what kind of piece it is
interface PostBase {

  slug: string;
  // stable id — react key now, url segment later
  title: string;
  date: string;
  // ISO "2026-07-18" so it sorts as a plain string
  description: string;
  ratio: Ratio;
  poster?: string;
  // still frame. grid shows this, blowup runs the real thing.
  // no poster = tile falls back to a flat colored block

}

// a discriminated union: `type` is the discriminant, and each variant
// declares ONLY the fields it needs — as required fields.
// so `if (post.type === "image")` narrows to ImagePost, and post.src
// is known to exist. a half-filled post fails to compile.

export interface ImagePost extends PostBase {

  type: "image";
  src: string;
  // path under public/, e.g. "/posts/selfie/full.png"

}

export interface VideoPost extends PostBase {

  type: "video";
  src: string;
  // path under public/, e.g. "/posts/beach-loop/clip.mp4"

}

export interface SketchPost extends PostBase {

  type: "p5" | "three";
  sketchId: string;
  // key into sketches/registry.ts — NOT a file path

}

export type Post = ImagePost | VideoPost | SketchPost;
