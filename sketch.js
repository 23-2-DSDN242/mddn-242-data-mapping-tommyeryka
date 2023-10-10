let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_new2.jpg";
let maskFile   = "mask_new2.png";
let outputFile = "output_3.png";

function preload() { 
  sourceImg = loadImage(sourceFile); 
  maskImg = loadImage(maskFile); 

    textImg = loadImage("dots.png");
}

function setup () {
  let main_canvas = createCanvas(1800, 1350);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(255);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}

let X_STOP = 1800; //1920
let Y_STOP = 1350; //1080
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
        // let new_sat = map(s, 0, 100, 50, 100);
        let new_brt = map(b, 0, 100, 100, 0);
       //  let new_hue = map(h, 0, 360, 180, 540);
       // let new_col = color(0,new_hue, new_sat, new_brt);
       let new_col = color(h-100, s+50, b+60); //makes it normal color 
       //let new_col = color(h, 0, new_brt+20); //makes things colourless
        set(i, j, new_col);
      }
      else { //sets background col
        // let new_brt = map(b, 0, 100, 20, 40);
        let new_bright = map(b, 0, 100, 100, 0);
       let new_col = color(h+80, 80, new_bright-20);
        //let new_col = color(h, s, b);
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

renderCounter = renderCounter + num_lines_to_draw;
updatePixels();

  // print(renderCounter);
  if(renderCounter > Y_STOP) {
    console.log("Done!")
    noLoop();



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
}