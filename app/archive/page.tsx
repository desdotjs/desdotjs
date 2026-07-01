"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {

    const colors = [
      "rgb(94, 238, 89)",
      "rgb(255, 107, 210)",
      "rgb(96, 90, 255)",
      "rgb(255, 250, 95)",
      "rgb(255, 166, 50)",
      "rgb(227, 65, 65)",
      "rgb(63, 195, 251)",
      "rgb(204, 74, 252)"

    ];

    let storedIndex = localStorage.getItem("colors");

    let index : number = storedIndex == null ? 0 : Number(storedIndex);
    console.log(index);
    // check whether storedIndex is null. if it is, start index at 0. if it isn’t, turn storedIndex into a number and assign it to index

    document.body.style.backgroundColor = colors[index];
    // document.body.style.backgroundColor is used in vanilla JS - "canvas" is a p5 thing

    index++;
    console.log(index);
    if (index >= colors.length) index = 0;

    localStorage.setItem("colors", `${index}`)

  }, []);

  return (
    <>
      <div className="art-container"></div>

      <div className="top-wrapper">
        <div className="header-container">
          <h1>desdotjs</h1>
        </div>

        <div className="button-container">
          <a href="/journal">
          </a>
        </div>
      </div>

      <div className="cv-container">
        <h1>artist cv</h1>

        <h3>Education</h3>
        <h4>School of the Art Institute of Chicago 2024 - 2027</h4>
        <p><i>Bachelors of Fine Arts and Creative Technologies</i></p>
        <p>
          Interdisciplinary coursework spanning interactive systems, generative media, 3D
          environments, video editing, UI/UX fundamentals, and TouchDesigner.
        </p>

        <hr />

        <h3>Exhibitions</h3>
        <h4>
          2025 - Installation,{" "}
          <a href="https://desdotjs.github.io/weird-girl-world/laundry-space/laundry-space-index.html">
            <i>Laundry Space</i>
          </a>
        </h4>
        <p><i>School of the Art Institute Technology Department, Chicago, IL</i></p>

        <hr />

        <h3>Projects</h3>
        <h4>
          2026 to Present -{" "}
          <a href="https://www.instagram.com/desdotjs/">
            <i>@desdotjs</i>
          </a>
        </h4>
        <p><i>Digital Research Journal</i></p>

        <hr />
      </div>

      <div className="nav-container">
        <nav>
          <ul>
            <li><a href="https://github.com/desdotjs">github</a></li>
            <li><a href="/journal">journal</a></li>
            <li><a href="/contact">contact</a></li>
            <li><a href="/archive">archive</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
}