let npc;
class WorldGenerator{
	constructor(x, y, z){
		// Initial the world size variable.
		this.x = x;
		this.y = y;
		this.z = z;
		this.terrain = [];
		this.type = [];
		this.trigger = [];

		this.scale = 18;
		this.dimension = -((x+y+z)/3)*this.scale/2;

		this.x_off = this.y_off = this.z_off = 0;


		// Initial the terrain and type array.
		for (let x = 0; x < this.x; x++) {
			this.terrain[x] = [];
			this.type[x] = [];
			this.trigger[x] = [];
	  		for (let y = 0; y < this.y; y++) {
	  			this.terrain[x][y] = [];
	  			this.type[x][y] = [];
	  			this.trigger[x][y] = [];
	  			for(let z = 0; z < this.z; z++){
	  			}
	  		}
		}

		// Map the terrain and the type of cube.
		for (let z = 0; z< this.z; z++){
			this.y_off = 0;
			
	  		for (let y = 0; y < this.y; y++) {
		    	this.x_off = 0;
		    	for (let x = 0; x < this.x; x++) {
			    	this.terrain[x][y] = int(map(noise(this.x_off, this.y_off, this.z_off), 0, 1, 0, this.z));
				    this.type[x][y] = map(noise(this.x_off, this.y_off, this.z_off), 0, 1, 0, 100);
				    this.x_off += 0.1;
				    this.trigger[x][y] = random();
	    		}
	    		this.y_off += 0.1;
	  		}
	  		this.z_off += 0.1;
	  	}

	  	this.loadtexture();
	  	this.switch = [];
	  	this.num = 0;
	  	for(var i = 0; i < 6; i++){
		      this.switch[i] = new NPC();
		}
	}

	instantiateWorld(){
		translate(this.dimension, this.dimension, this.dimension);
		this.num = 0;
	 	for (let z = 0; z < this.z; z++){  		
		  	for (let y = 0; y < this.y; y++) {   
		    	for (let x = 0; x < this.x; x++) {
		     		translate(this.scale, 0);
		     		if(this.terrain[x][y] == z || this.terrain[x][y] == z+1 || this.terrain[x][y] == z+2){
		     			this.fillType(x, y ,z);
		      			box(this.scale);
		      		}

		      		if(this.trigger[x][y] < 0.01 && this.terrain[x][y] == z-1){
		      			if(this.num < 6){
		      				this.switch[this.num].drawNPC();
		      				this.switch[this.num].setCordinate(x*this.scale, y*this.scale, z*this.scale);
		      				this.num++;
		      			}
		      		}			
		  		}
		  		translate(-this.scale*this.x, this.scale);		      
		   	}
			translate(0, -this.scale*this.y, this.scale);
		}
	}

	loadtexture(){
		this.grass = loadImage('assets/grass.jpg');
  		this.dirt = loadImage('assets/dirt.png');
  		this.water = loadImage('assets/water.jpg');
  		this.deepwater = loadImage('assets/deepwater.jpg');
  		this.snow = loadImage('assets/snow.jpg');
	}

	seed(seed){
		noiseSeed(seed);
		this.z_off = 0;
		
		for (let z = 0; z< this.z; z++){
			this.y_off = 0;
	  		for (let y = 0; y < this.y; y++) {
		    	this.x_off = 0;
		    	for (let x = 0; x < this.x; x++) {
			    	this.terrain[x][y] = int(map(noise(this.x_off, this.y_off, this.z_off), 0, 1, 0, this.z));
				    this.type[x][y] = map(noise(this.x_off, this.y_off, this.z_off), 0, 1, 0, 100);
				    this.x_off += 0.1;
	    		}
	    		this.y_off += 0.1;
	  		}
	  		this.z_off += 0.1;
	  	}
	}

	fillType(x, y, z){
		noStroke();
	    if((this.type[x][y]) > 35){
	      	if((this.type[x][y]) > 75){
	      		//fill(255, 255, 255);
	      		texture(this.snow);
			}else if((this.type[x][y]) > 50){
	      		texture(this.grass);
	      	}else {
	      		//fill(160,82,45);
	      		texture(this.dirt);
	      	}		      			
		}else if((this.type[x][y]) < 30){
			//fill(0, 0, 255);
			texture(this.deepwater);
		}else{
			//fill(65,105,225);
			texture(this.water);
		}
	}
}
