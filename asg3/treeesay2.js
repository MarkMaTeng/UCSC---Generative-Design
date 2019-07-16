var yoff = 0;
var seed = 12;
function setup() {
    createCanvas(1000, 600);
    seed = int(random(0, 100))
   	smooth();
}

function draw() {
    background(255);
    fill(0);
    stroke(0);

    translate(width/2, height);

    yoff += 0.005;
    randomSeed(seed);
    branch(60,0);

    //noLoop();
}

function branch(h,  xoff) {
	//strokeWeight(2);

    this.sw = map(h, 2, 100, 1, 5);
	strokeWeight(this.sw);
	// Draw the branch
	line(0, 0, 0, -h);
	// Move along to end
	translate(0, -h);

	// Each branch will be 2/3rds the size of the previous one
	h *= 0.66;
	  
	// Move along through noise space
	xoff += 0.1;

	if (h > 4) {
	  // Random number of branches
	  var n = int(random(0, 5));
	  for (var i = 0; i < n; i++) {
	    
	    // Here the angle is controlled by perlin noise
	    // This is a totally arbitrary way to do it, try others!
	    var theta = map(noise(xoff+i, yoff), 0, 1, -PI/3, PI/3);
	    if (n%2==0) theta *= -1;
	    
	    push();      // Save the current state of transformation (i.e. where are we now)
	    rotate(theta);     // Rotate by theta
	    branch(h, xoff);   // Ok, now call myself to branch again
	    pop();       // Whenever we get back here, we "pop" in order to restore the previous matrix state
	    }
	}
}

function mousePressed() {
  // New tree starts with new noise offset and new random seed
  yoff = random(1000);
  seed = millis();
}