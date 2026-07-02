const baseCellSize = 150;
const mobileCellSize = 90;
const baseContainerWidth = 1200;
const mobileBreakpoint = 768;

const lpsSketch = (p) => {
  let lps1, lps2, lps3;
  let grid = [];
  let cols, rows;
  let cellSize;
  let toggledCells = new Set();

  function getContainerSize() {
    let container = p.canvas.parentElement;
    return {
      width: container.offsetWidth,
      height: container.offsetHeight,
    };
  }

  function buildGrid() {
    let { width, height } = getContainerSize();

    let isMobile = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches;

    if (isMobile) {
      cellSize = mobileCellSize;
    } else {
      cellSize = baseCellSize * (width / baseContainerWidth);
    }

    cols = Math.ceil(width / cellSize);
    rows = Math.ceil(height / cellSize);
    grid = [];

    for (let y = 0; y < rows; y++) {
      grid[y] = [];
      for (let x = 0; x < cols; x++) {
        let cx = x * cellSize + cellSize / 2;
        let cy = y * cellSize + cellSize / 2;
        let baseImg = (x + y) % 2 === 0 ? lps1 : lps2;
        grid[y][x] = new Cell(cx, cy, baseImg, x, y);

        if (toggledCells.has(`${x},${y}`)) {
          grid[y][x].current = lps3;
        }
      }
    }
  }

  class Cell {
    constructor(x, y, baseImg, gridX, gridY) {
      this.x = x;
      this.y = y;
      this.base = baseImg;
      this.current = baseImg;
      this.gridX = gridX;
      this.gridY = gridY;
    }

    show() {
      p.image(this.current, this.x, this.y, cellSize, cellSize);
    }

    toggle() {
      let key = `${this.gridX},${this.gridY}`;

      if (this.current === this.base) {
        this.current = lps3;
        toggledCells.add(key);
      } else {
        this.current = this.base;
        toggledCells.delete(key);
      }
    }

    contains(mx, my) {
      return (
        mx > this.x - cellSize / 2 &&
        mx < this.x + cellSize / 2 &&
        my > this.y - cellSize / 2 &&
        my < this.y + cellSize / 2
      );
    }
  }

  function clientTap() {
    if (grid.length === 0) return;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let cell = grid[y][x];
        if (cell.contains(p.mouseX, p.mouseY)) {
          cell.toggle();
        }
      }
    }
  }

  p.setup = async () => {
    let { width, height } = getContainerSize();
    p.createCanvas(width, height);
    p.imageMode(p.CENTER);

    lps1 = await p.loadImage("/p5_assets/lps1.png");
    lps2 = await p.loadImage("/p5_assets/lps2.png");
    lps3 = await p.loadImage("/p5_assets/lps3.png");

    buildGrid();
  };

  p.draw = () => {
    if (grid.length === 0) return;

    p.clear();
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        grid[y][x].show();
      }
    }
  };

  p.mousePressed = () => {
    clientTap();
  };

  p.touchStarted = () => {
    clientTap();
  };

  p.windowResized = () => {
    let { width, height } = getContainerSize();
    p.resizeCanvas(width, height);
    buildGrid();
  };
};

const sketch1 = [lpsSketch];

export default sketch1;