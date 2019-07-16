
function setup() {
    createCanvas(1000, 600);

   	smooth();
}

function draw() {
    background(255);

    translate(width/2, height);
    stroke(0);
    branch(50,0);
    noLoop();
}

function branch(len, level) {
	strokeWeight(2);

    this.theta = random(0, PI/3);

  	line(0, 0, 0, -len);
  // Move to the end of that line
  	translate(0, -len);

  	len *= 0.8;
  	level++;
  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  	if (level < 10) {
  		
  		if(random(10) < 8){
	    push();    
	    rotate(this.theta);  
	    branch(len,level); 
	    pop();
	    }    
	    
	    if(random(10) < 8){
	    push();    
	    rotate(-this.theta);  
	    branch(len,level); 
	    pop();
	    }

	    if(random(10) < 1){
	    push();    
	    rotate(this.theta);  
	    branch(len,level); 
	    pop();
	    }

	    if(random(10) < 1){
	    push();    
	    rotate(-this.theta);  
	    branch(len,level); 
	    pop();
	    }    
	}
}