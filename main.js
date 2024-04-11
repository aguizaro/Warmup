import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <div class="canvas">
      <canvas id="canvas"></canvas>
    </div>
    <div class"dropdown">
      <button class="dropbtn">Controls</button>
      <div class="dropdown-content" style="display: none">
        <div class="speed">
          <label for="speedSlider">Rotation Speed </label>
          <input type="range" min="1" max="20" value="5" class="slider" id="speedSlider">
        </div>
        <div class= "size">
        <label for="sizeSlider"> Triangle Size </label>
          <input type="range" min="10" max="100" value="50" class="slider" id="sizeSlider">
        </div>
        <div class="color">
          <label for="colorPicker">Triangle Color</label>
          <input type="color" id="colorPicker" value="#ff0000">
        </div>
      </div>
    </div>
  </div>
`

// access ------------------------------------------------
const canvas = document.getElementById('canvas');
const sizeScaler = 3;
canvas.width = 100 * sizeScaler;
canvas.height = 100 * sizeScaler;
const ctx = canvas.getContext('2d');

const speedSlider = document.getElementById('speedSlider');
const sizeSlider = document.getElementById('sizeSlider');
const colorPicker = document.getElementById('colorPicker');
const dropbtn = document.querySelector('.dropbtn');

let currentColor = colorPicker.value;
let currentSpeed = speedSlider.value;


// triangle ------------------------------------------------

function drawTriangle() {
  ctx.beginPath();
  ctx.moveTo(canvas.width/4, 3*canvas.height/4);
  ctx.lineTo(3*canvas.width/4, 3*canvas.height/4);
  ctx.lineTo(canvas.width/2, canvas.height/4);
  ctx.closePath();
  ctx.fillStyle = currentColor;
  ctx.fill();
}


let angle = 0;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(angle);
  ctx.translate(-canvas.width/2, -canvas.height/2);
  drawTriangle();
  ctx.restore();
  angle += 0.01 * currentSpeed;
  requestAnimationFrame(draw);
}

sizeSlider.addEventListener('input', function() {
  canvas.width = sizeSlider.value * sizeScaler;
  canvas.height = sizeSlider.value * sizeScaler;
  drawTriangle();
});

speedSlider.addEventListener('input', function() {
  currentSpeed = speedSlider.value;
  drawTriangle();
});

colorPicker.addEventListener('input', function() {
  currentColor = colorPicker.value;
  drawTriangle();
});


dropbtn.addEventListener('click', function() {
  let dropdown = document.querySelector('.dropdown-content');
  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
  }
});




// main ------------------------------------------------

drawTriangle();
draw();



