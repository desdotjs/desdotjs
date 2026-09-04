// rule 110, one row per frame, top to bottom. click to reseed.

const cellSize = 4;

const cellular = (p) => {

  let cells = [];
  let cols = 0;
  let row = 0;

  function reseed() {

    cols = Math.ceil(p.width / cellSize);
    cells = [];

    for (let i = 0; i < cols; i++) {
      cells.push(Math.random() < 0.5 ? 1 : 0);
    }

    row = 0;
    p.background(255);

  }

  function fit() {

    const box = p.canvas.parentElement;
    p.resizeCanvas(box.offsetWidth, box.offsetHeight);
    reseed();

  }

  p.setup = () => {

    // a real size needs p.canvas to exist, so make a throwaway one first
    p.createCanvas(100, 100);
    p.noStroke();
    p.fill(20);
    fit();

  };

  p.draw = () => {

    // stop once the canvas is full — click to start a new one
    if (row * cellSize > p.height) return;

    for (let i = 0; i < cols; i++) {
      if (cells[i]) {
        p.rect(i * cellSize, row * cellSize, cellSize, cellSize);
      }
    }

    const next = [];

    for (let i = 0; i < cols; i++) {

      const l = cells[(i - 1 + cols) % cols];
      const c = cells[i];
      const r = cells[(i + 1) % cols];

      // 110 as a lookup: bit N of 0b01101110 is the output for pattern N
      next.push((110 >> (l * 4 + c * 2 + r)) & 1);

    }

    cells = next;
    row++;

  };

  p.mousePressed = () => {
    reseed();
  };

  p.touchStarted = () => {
    reseed();
  };

  p.windowResized = fit;

};

export default cellular;
