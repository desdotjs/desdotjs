"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./headerArt.module.css";
import sketches from "./sketch1";

export default function HeaderCycle() {
  const containerRef = useRef(null);
  const [sketchIndex, setSketchIndex] = useState(null);

  useEffect(() => {
    let stored = localStorage.getItem("sketchIndex");
    let index = stored === null ? 0 : parseInt(stored, 10);

    if (isNaN(index)) index = 0;

    let nextIndex = (index + 1) % sketches.length;

    localStorage.setItem("sketchIndex", nextIndex);
    setSketchIndex(index);
  }, []);

  useEffect(() => {
    if (sketchIndex === null) return;

    let p5Instance;

    async function loadSketch() {
      const p5 = (await import("p5")).default;
      const chosenSketch = sketches[sketchIndex];
      p5Instance = new p5(chosenSketch, containerRef.current);
    }

    loadSketch();

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, [sketchIndex]);

  return <div ref={containerRef} className={styles.p5Container}></div>;
}