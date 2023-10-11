let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_new3.jpg";
let maskFile   = "mask_new3.png";
let outputFile = "output_1.png";

function preload() { 
  sourceImg = loadImage(sourceFile); 
  maskImg = loadImage(maskFile); 
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(255);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  
}

let X_STOP = 1920;
let Y_STOP = 1080;
let OFFSET = 15;


function draw () {
  
  let num_lines_to_draw = 40;
  // get one scanline
  for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<1080; j++) {
    for(let i=0; i<1920; i++) {
      colorMode(RGB);
      let pix = sourceImg.get(i, j);
      // create a color from the values (always RGB)
      let col = color(pix);
      let mask = maskImg.get(i, j);

      colorMode(HSB, 360, 100, 100); // max values for h s b 
      // sets hue sat and brightness
      let h = hue(col);
      let s = saturation(col);
      let b = brightness(col);

      if(mask[0] > 128) { //sets can / mask col
        // draw the full pixels
        let new_brt = map(b, 0, 100, 100, 0);
       let new_col = color(h-100, s+50, b+60); //makes it normal color 
        set(i, j, new_col);
      }
      else { //sets background col
        let new_bright = map(b, 0, 100, 100, 0);
       let new_col = color(h+80, 80, new_bright-20);
        set(i, j, new_col);

      }
    }
  }

renderCounter = renderCounter + num_lines_to_draw;
updatePixels();
// print(renderCounter);
if(renderCounter > 1400) {
console.log("Done!")
noLoop();
}


/*
  // creates the wave effect

  angleMode(DEGREES);
  for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<Y_STOP; j++) {
    for(let i=0; i<X_STOP; i++) {
      colorMode(RGB);
      let mask = maskImg.get(i, j);
      if (mask[1] > 128) { //the blurr effect back or front
        pix = sourceImg.get(i, j);
      
      }
      else {
        let wave = sin(j*20); //changes blurr
        let slip = map(wave, -1, 1, -OFFSET, OFFSET);
        pix = sourceImg.get(i+slip, j);

      }
      set(i, j, pix);
    }
        }
  renderCounter = renderCounter + num_lines_to_draw;
  updatePixels();

  // print(renderCounter);
  if(renderCounter > Y_STOP) {
    console.log("Done!")
    noLoop();

  }
*/

  
function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
  
      }
