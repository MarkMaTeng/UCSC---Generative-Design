class NPC {
	constructor(){
		this.pg = createGraphics(200, 200);
		this.pg.background(255,255,255);
		this.on = true;
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}

	drawNPC(){
		texture(this.pg);
		rotateX(PI/2);
		cone(10, 10);
		rotateX(-PI/2);
	}

	setCordinate(x, y, z){
		this.x = x;
		this.y = z;
		this.z = y;
		//console.log("npc:",this.x, this.y, this.z);
	}

	turnoff(){
		if(this.on != false){
			this.pg.background(0);
			this.on = false;
			return 300;
		}
	}


}