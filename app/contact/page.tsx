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
          <h1>inbox system under construction.</h1>
        </div>
      </div>

      <div className="cv-container">
        <h1>email me</h1>

        <h3>desdotjs@gmail.com</h3>
      </div>

      <div className="nav-container">
        <nav>
          <ul>
            <li><a href="/">home</a></li>
            <li><a href="https://github.com/desdotjs">github</a></li>
            <li><a href="/journal">journal</a></li>
            <li><a href="/archive">archive</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
}