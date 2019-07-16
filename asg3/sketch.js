let lsystem;
let dialog;
let npc;

function setup() {
    createCanvas(800, 600);
    strokeWeight(2);

    this.x = 50;

    npc = new NPC();
}

function draw() {
	background(255, 255, 255);
	fill(204, 101, 192, 127);
    rect(this.x, height-50, 40, 40);

    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) x += 5;

    
    npc.drawNPC()

    if (key === " " && this.x - 400 < 60 && this.x - 400 > -60) {
    	npc.dialogSwitch(true);
    }

    print(npc.IsDialogOpen());

    if (npc.IsDialogOpen()){

    	npc.greeting();

    	if (key === "y" && this.x - 400 < 60 && this.x - 400 > -60){
	    	npc.drawArt();
	    }

	    
	    if (key === "n" && this.x - 400 < 60 && this.x - 400 > -60){
    		npc.dialogSwitch(false);
    	}
    }


    
}

function keyTyped() {
	if (npc.IsDialogOpen() && key === "y") {
		npc.expandParser();
	}
}
