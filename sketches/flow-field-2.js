// perlin noise pushing particles around, drawn as accumulating trails.
// click to reseed the field and start over.

const particleCount = 900;
const noiseScale = 0.004;

const flowField = (p) => {

  let particles = [];

  function seed() {

    p.noiseSeed(Math.floor(Math.random() * 10000));

    particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * p.width,
        y: Math.random() * p.height,
      });
    }

    p.background(255);

  }

  function fit() {

    const box = p.canvas.parentElement;
    p.resizeCanvas(box.offsetWidth, box.offsetHeight);
    seed();

  }

  p.setup = () => {

    p.createCanvas(100, 100);
    p.stroke(20, 40);
    p.strokeWeight(1);
    fit();

  };

  p.draw = () => {

    for (const q of particles) {

      const angle = p.noise(q.x * noiseScale, q.y * noiseScale) * Math.PI * 4;
      const nx = q.x + Math.cos(angle) * 1.2;
      const ny = q.y + Math.sin(angle) * 1.2;

      p.line(q.x, q.y, nx, ny);

      q.x = nx;
      q.y = ny;

      // wrap strays back to a random spot so the field stays populated
      if (q.x < 0 || q.x > p.width || q.y < 0 || q.y > p.height) {
        q.x = Math.random() * p.width;
        q.y = Math.random() * p.height;
      }

    }

  };

  p.mousePressed = () => {
    seed();
  };

  p.touchStarted = () => {
    seed();
  };

  p.windowResized = fit;

};

export default flowField;
