// grid of cells breathing on a sine loop.
// click a cell to lock it to the accent colour, click again to release.

const targetCell = 90;

const lpsGrid = (p) => {

  let cols, rows, cell;
  const locked = new Set();

  // p5 appends its canvas into the node it was handed, so the parent
  // element is the closeup's media box — that's what we size against.

  function fit() {

    const box = p.canvas.parentElement;
    p.resizeCanvas(box.offsetWidth, box.offsetHeight);

    cell = Math.max(28, Math.min(targetCell, p.width / 8));
    cols = Math.ceil(p.width / cell);
    rows = Math.ceil(p.height / cell);

  }

  function tap() {

    const x = Math.floor(p.mouseX / cell);
    const y = Math.floor(p.mouseY / cell);

    if (x < 0 || y < 0 || x >= cols || y >= rows) return;

    const key = `${x},${y}`;

    if (locked.has(key)) {
      locked.delete(key);
    } else {
      locked.add(key);
    }

  }

  p.setup = () => {

    // a real size needs p.canvas to exist, so make a throwaway one first
    p.createCanvas(100, 100);
    p.noStroke();
    fit();

  };

  p.draw = () => {

    p.background(255);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {

        const phase = (x + y) * 0.35 + p.frameCount * 0.04;
        const size = cell * (0.45 + 0.35 * Math.sin(phase));
        const cx = x * cell + cell / 2;
        const cy = y * cell + cell / 2;

        if (locked.has(`${x},${y}`)) {
          p.fill(255, 79, 216);
        } else {
          p.fill((x + y) % 2 === 0 ? 20 : 155);
        }

        p.rect(cx - size / 2, cy - size / 2, size, size);

      }
    }

  };

  p.mousePressed = tap;
  p.touchStarted = tap;
  p.windowResized = fit;

};

export default lpsGrid;
