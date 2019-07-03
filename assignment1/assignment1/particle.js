class PVector {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  

  add(v) { 
    this.y = this.y + v.y; 
    this.x = this.x + v.x; 
  }

  get() {
    return new PVector(this.x, this.y); 
  }
}

class Particle {
  constructor(l) {
    this.acceleration = new PVector(0, 0.05);
    this.force = new PVector(0, random(0, 2));
    this.location = l.get();
    this.lifespan = random(100,255);
    this.alive = false;
    this.origin();
    
  }

  origin(){
  	this.originLifespan = this.lifespan;
  	this.originForce = this.force.y;
  	this.x = this.location.get().x;
    this.y = this.location.get().y;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
  	var level = amplitude.getLevel();
  	var size = map(level, 0, 1, 0, 100);
    this.force.add(this.acceleration);
  	this.location.add(this.force);
    this.lifespan -= 2.0;
  }

  display() {
  	var level = amplitude.getLevel();
  	var size = map(level, 0, 1, 0, 300);
  	var color = map(level, 0, 1, 0, 255);
    //stroke(random(0, 255), this.lifespan, color);
    switch(Math.round(random(1,3))){
        case 1:
            fill(random(0, 255), color, this.lifespan);
            break;
        case 2:
            fill(color, random(0, 255), this.lifespan);
            break;
        case 3:
            fill(this.lifespan, color, random(0, 255));
            break;
        }
        print(color);
        print(random(1,3));
       
    ellipse(this.location.x, this.location.y, size, size);

  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }

  respawn() {
    this.force = new PVector(0, random(-2,0));
    this.location.x =  this.x;
    this.location.y =  this.y;
    this.lifespan = this.originLifespan;
    this.force.y = this.originForce;
    this.alive = true;
    
  }
}

