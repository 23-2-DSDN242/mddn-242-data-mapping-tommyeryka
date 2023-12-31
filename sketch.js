let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_3.jpg";
let maskFile   = "mask_3.png";
let outputFile = "output_3.png";

function preload() { 
  sourceImg = loadImage(sourceFile); 
  maskImg = loadImage(maskFile); 
}

function setup () {
  let main_canvas = createCanvas(1800, 1080);
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
  // changes colours... mask and background
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
       let new_col = color(h-80, s+20, b+100); //makes it normal color 
        set(i, j, new_col);
      }
      else { //sets background col
        let new_bright = map(b, 0, 100, 100, 0);
       let new_col = color(h+80, 80, new_bright-15);
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

  
function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
  
      }
