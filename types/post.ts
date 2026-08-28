// post interface / shape

export interface Post {

  title: string;
  date: string;
  type: "p5" | "three" | "image" | "video";
  sketchId?: string;
  src?: string;
  
}