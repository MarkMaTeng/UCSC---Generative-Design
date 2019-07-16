class NPC {
	constructor(){
    	dialog = new Dialog();
    	lsystem = new GenerativeGrammar();
    	lsystem.expand();
	}

	drawNPC(){
		fill(50, 201, 92, 227);
    	ellipse(400, height-50, 80, 80);
	}

	dialogSwitch(on){
		dialog.switch(on);
	}

	IsDialogOpen(){
		return dialog.on;
	}

	expandParser(){
		lsystem.expand();
	}


	greeting(){
		dialog.greeting();
	}

	drawArt(){
		dialog.drawArt(lsystem);
	}

}