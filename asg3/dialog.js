class Dialog {
	constructor(){
		this.on = false;
	}

	switch(on){
		if(on == true){
			this.on = true;
		} else {
			this.on = false;
		}
	}

	greeting(){
		fill(255, 204, 0);
		rect(100, 0, 500, 500);
		textSize(24);
		fill(0, 0, 0);
		text('Hi, my name is Ana!', 120, 30);
		text('Do you want me to draw you a artwork?', 120, 70);
	}


	drawArt(lsystem){
		fill(255, 204, 0);
		rect(100, 0, 500, 500);

		lsystem.drawArt();
		fill(0, 0, 0);
		text('Do you want another one?', 120, 30);
	}

	clear(){
		background(255, 255, 255);
	}
}