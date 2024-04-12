// html setup ------------------------------------------------

document.querySelector('#app').innerHTML = `
  <div>
    <div class="canvas">
      <canvas id="canvas"></canvas>
    </div>
    <div class"dropdown">
      <button class="dropbtn">Controls</button>
      <div class="dropdown-content" style="display: none">
        <div class="sides">
          <label for="sidesSlider">Number of Sides </label>
          <input type="range" min="3" max="20" value="3" class="slider" id="sidesSlider">
          <span id="sidesValue">3</span>
        </div>
        <div class="speed">
          <label for="speedSlider">Rotation Speed </label>
          <input type="range" min="1" max="20" value="5" class="slider" id="speedSlider">
          <span id="speedValue">5</span>
        </div>
        <div class= "size">
          <label for="sizeSlider"> Triangle Size </label>
          <input type="range" min="10" max="100" value="50" class="slider" id="sizeSlider">
          <span id="sizeValue">50</span>
        </div>
        <div class="triangle-direction>
          <label for="direction">Direction</label>
          <select id="direction">
            <option value="clockwise">Clockwise</option>
            <option value="counterclockwise">Counter Clockwise</option>
          </select>
        </div>
        <div class="color">
          <label for="colorPicker">Triangle Color</label>
          <input type="color" id="colorPicker" value="#ff0000">
        </div>
      </div>
    </div>
  </div>
`

// vars ------------------------------------------------

const canvas = document.getElementById('canvas');
const sizeScaler = 3;
canvas.width = 100 * sizeScaler;
canvas.height = 100 * sizeScaler;
const ctx = canvas.getContext('2d');

const sidesSlider = document.getElementById('sidesSlider');
const speedSlider = document.getElementById('speedSlider');
const sizeSlider = document.getElementById('sizeSlider');
const colorPicker = document.getElementById('colorPicker');
const dropbtn = document.querySelector('.dropbtn');
const direction = document.getElementById('direction');

let currentSides = sidesSlider.value;
let currentColor = colorPicker.value;
let currentSpeed = speedSlider.value;
let dir = direction.value == 'clockwise' ? 1 : -1;

let angle = 0;

const sidesValue = document.getElementById('sidesValue');
const speedValue = document.getElementById('speedValue');
const sizeValue = document.getElementById('sizeValue');

// geometry ------------------------------------------------

function drawNpolygon(n) {
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.height/2);
  for (let i = 0; i <= n; i++) {
    let x = canvas.width/2 + canvas.width/4 * Math.cos(2 * Math.PI * i / n);
    let y = canvas.height/2 + canvas.height/4 * Math.sin(2 * Math.PI * i / n);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = currentColor;
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(angle);
  ctx.translate(-canvas.width/2, -canvas.height/2);
  drawNpolygon(currentSides);
  ctx.restore();
  angle += (0.01 * currentSpeed) * dir;
  requestAnimationFrame(draw);
}

// event listeners ------------------------------------------------

sidesSlider.addEventListener('input', function() {
  currentSides = sidesSlider.value;
  sidesValue.textContent = currentSides;
  drawNpolygon(currentSides);
});

sizeSlider.addEventListener('input', function() {
  canvas.width = sizeSlider.value * sizeScaler;
  canvas.height = sizeSlider.value * sizeScaler;
  sizeValue.textContent = sizeSlider.value;
  drawNpolygon(currentSides);
});

speedSlider.addEventListener('input', function() {
  currentSpeed = speedSlider.value;
  speedValue.textContent = currentSpeed;
  drawNpolygon(currentSides);
});

colorPicker.addEventListener('input', function() {
  currentColor = colorPicker.value;
  drawNpolygon(currentSides);
});

dropbtn.addEventListener('click', function() {
  let dropdown = document.querySelector('.dropdown-content');
  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
  }
});

direction.addEventListener('change', function() {
  dir = direction.value == 'clockwise' ? 1 : -1;
});

// main ------------------------------------------------

draw();



