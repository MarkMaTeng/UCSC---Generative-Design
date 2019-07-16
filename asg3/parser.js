class GenerativeGrammar {
	constructor(){
		this.axiom = "F";
		this.rulesa = {"F": "FF-[-F+F]+[+F-F]"};
    	this.rulesb = {"F": "FF+[+F-F]-[-F+F]"};
    	this.rulesc = {"F": "F+F"};
    	this.generation = 3;
    	this.angle = 25;
    	this.proa = 0.9;
    	this.prob = 0.3;
    	this.proc = 0.01;
    	this.s;   	
    	
		
	}

	expand(){
		let lsystem = new LSystem(this.rulesa, this.proa, this.rulesb, this.prob, this.rulesc, this.proc);
		let s = lsystem.expand(this.axiom, this.generation);
		this.lsystem = lsystem;
		this.s = s;
	}


	drawArt(){
		let lsystem = new LSystem();
		lsystem.drawString(this.s, this.angle);
	}

}