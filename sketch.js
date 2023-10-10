let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_2.jpg";
let maskFile   = "mask_2.png";
let outputFile = "output_1.png";

function preload() { 
  sourceImg = loadImage(sourceFile); 
  maskImg = loadImage(maskFile); 

    textImg = loadImage("swirl.png");
}

function setup () {
  let main_canvas = createCanvas(1920, 1440);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(255);
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
  
 
  let num_lines_to_draw = 40;
  // get one scanline
  for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<1080; j++) {
    for(let i=0; i<X_STOP; i++) {
      colorMode(RGB);
      let pix = sourceImg.get(i, j);
      // create a color from the values (always RGB)
      let col = color(pix);
      let mask = maskImg.get(i, j);
      let tex = textImg.get(i, j);

      if(mask[0] < 128) {
        set(i, j, pix);
      }
      else {
        let new_col = [0, 0, 0, 255];
        for(let k=0; k<3; k++) {
          new_col[k] = map(40, 0, 100, pix[k], tex[k]);
        }
        // let new_col = color(h, s,  newBrt);
        set(i, j, new_col);
      }
    }
  
  renderCounter = renderCounter + num_lines_to_draw;
  updatePixels();

  // print(renderCounter);
  if(renderCounter > Y_STOP) {
    console.log("Done!")
    noLoop();

    

  angleMode(DEGREES);
  let num_lines_to_draw = 40;
  // get one scanline
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
    }
