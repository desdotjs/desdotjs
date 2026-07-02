"use client";

import { useEffect } from "react";
import styles from "./page.module.css"

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
        <h1>welcome to my journal ^_^</h1>
        <p><i>july 1 2026</i></p>
        <p className={styles.jpstyle}>{`ive been thinking a lot recently and came to the conclusion that life is better off observing people rather than trying to connect with them.

          a common frustration many fem artists find is the performance of men. its happened many times before: we think they respect our careers and talents, so you exchange instagram handles to talk about what they'd like to commission. 

          humans are opportunistic and tend to perform. since they have access to the female artist's time of day, it turns into, "how would you describe yourself?" or a total ghosting when you take their request seriously by sending rates or paperwork.

          i needed to find a way to filter out those who don't equally respect and take me seriously. i made some business cards with my beautiful `}
          <a href="https://www.instagram.com/p/DXFkixXj0LB/">fursona</a>
          {` artwork and figured people can email me. it seemed better than immediate access to direct messaging.

          still, no success in communicating a proper boundary. expecting the world to consider or understand you is not practical. what is practical is my creativity and love for computer. so, i decided my next website project is going to be an internal messaging system. the client will have to log in to see what messages were sent, unopened, or responded to.

          ill have to look into the legalities of having user data like emails. fine, i guess they have to consent to being on my email list.

          hopefully, this internal system will attract those who are brilliant and focused.
        `}</p>
        
        <hr></hr>

      </div>

      <div className="nav-container">
        <nav>
          <ul>
            <li><a href="/">home</a></li>
            <li><a href="https://github.com/desdotjs">github</a></li>
            <li><a href="/contact">contact</a></li>
            <li><a href="/archive">archive</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
}