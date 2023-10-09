let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
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
  background(255, 0, 0);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}

let X_STOP = 1800;
let Y_STOP = 1300;
// let X_STOP = 1920;
// let Y_STOP = 1080;
let OFFSET = 15;



//let renderCounter=0;

function draw () {
  
  angleMode(DEGREES);
  let num_lines_to_draw = 80;
  // get one scanline
  for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<Y_STOP; j++) {
    for(let i=0; i<X_STOP; i++) {
      colorMode(RGB);
      let mask = maskImg.get(i, j);
      if (mask[1] > 128) { //the blurr effect back or front
        pix = sourceImg.get(i, j);
      }
      else {
        let wave = sin(j*8);
        let slip = map(wave, -1, 1, -OFFSET, OFFSET);
        pix = sourceImg.get(i+slip, j);


  // for(let c=0; c<3; c++) {
       //  pix[c] = brt;
      // }
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
/*
function draw () {
  for(let i=0;i<40000;i++) {
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));
    let pix = sourceImg.get(x, y);
    let mask = maskImg.get(x, y);
    fill(pix);
    if(mask[0] > 128) {
      let pointSize = 10;
      ellipse(x, y, pointSize, pointSize);
    }
    else {
      let pointSize = 10;
      rect(x, y, pointSize, pointSize);    
    }
  }
  renderCounter = renderCounter + 1;
  if(renderCounter > 10) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
    // saveArtworkImage(outputFile);
  }
}
*/
  
function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
  
}