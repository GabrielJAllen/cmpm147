// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  createButton("reimagine").mousePressed(() => seed++);

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

let seed = 239;

const grassColor = "#455424";
const skyColor = "#5D84A1";
const riverColor = "#124863";
const bridgeColor = "#808080";
const bridgeShadowColor = "#575757";
const woodColor = "#573a1b";
const pathColor = "#786046";
const treeColor = "#770000"

function draw() {
  randomSeed(seed);

  background(100);

  noStroke();

  fill(skyColor);
  rect(0, 0, width, height / 2);

  fill(grassColor);
  rect(0, height / 2, width, height / 2);
  
  fill(riverColor);
  quad(width/3, height/2, width/4, height, 3*width/4, height, 2*width/3, height/2);
  
  let Xscale = .04;
  let Yscale = .02;
  for( let x = width/4; x < (3*width/4);x++){
    for(let y = height/2; y < height; y++){
      let R = 40 * noise(x * Xscale, (y - millis()) * Yscale );
      let G = 130 + 70 * noise(x * Xscale, (y - millis()) * Yscale);
      let B = 150 + 90 * noise(x * Xscale, (y - millis()) * Yscale);
      stroke(R, G, B);
      point( x , y );
    }
  }
  
  noStroke();
  
  fill(grassColor);
  triangle(width/3, height/2, width/4, height, width/4, height/2);
  triangle(2*width/3, height/2, 3*width/4, height, 3*width/4, height/2);
  
  fill(pathColor);
  rect(0, height/1.8, width, (height/1.6 - height/1.7));
  
  fill(woodColor);
  rect(width/2.5, height/2, width/20, height/5)
  rect(width/2.5 + width/7, height/2, width/20, height/5)
  
  fill(bridgeShadowColor);
  arc(width/2, height/1.8, width/2.5, height/3 , PI, 0);
  fill(bridgeColor);
  arc(width/2, height/1.7, width/2.5, height/3 , PI, 0);

  let trees = random(3, 9);
  let side = 1;
  let mod = height / 20;
  for( let i = 0; i < trees; i ++){
    fill(woodColor);
    let h = random(height/5 , height/2);
    let x = 0;
    if(side){
      x = random(width/3 - 50);
      side = 0;
    } else {
      x = random(width/2) + width/2;
      side = 1;
    }
    let w = random(width/200, width/20);
    let z = random( (height/2) + mod, (height/2) + 2 * mod );
    mod += height/20;
    triangle(x, z, x + w, z, x + (w/2), z - h);
    
    
    fill(treeColor);
    let r = random(width/20, width/10);
    circle( x + w/2, z - h, r);
  }
  
}