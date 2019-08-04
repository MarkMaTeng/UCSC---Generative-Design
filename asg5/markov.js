class MarkovChain{
	constructor(){
		let ilegalChars = {" ": 0};
		let pianoRoll = "";
		//let pd = this.train();
    	//pianoRoll = generateTrack(pd);
    	//console.log(pd);
	}

	generateTrack(pd){

		let first = "36_4";
		let nstate = this.sample(pd, "36_4");
		
    	let text = "";
    	var len = 3000;
    	for(var i = random(1500); i < len; i++) {
        	text += nstate;
    
        	nstate = this.sample(pd, nstate);
        	console.log(nstate);
    	}
    	console.log(pd);
    	return text;
	}

	train(pianoRolls){
		let pd = {};

    	// Load all states
	    for(let pianoRoll of pianoRolls) {
	    	for(let word of pianoRoll.split(" ")){
	    		if(word != "."){
	            	if(!(word in pd)) {
	               	 	// Create a new state for this character
	                	pd[word] = {};
	                	//console.log(pd);
	            	}
	    		}
	    	}
	    }
	    pd["."] = {};
	    //console.log(pd);

	    // Estimate probability distribution
	    for(let pianoRoll of pianoRolls) {
	    	let word = pianoRoll.split(" ");
	    	for(var i = 0; i < word.length; i++){	
	    		if(word[i] != "."){
		    		let cstate = word[i];
		            if(cstate in pd) {
		            	for(var j = i + 1; j < word.length && word[j] != "."; j++){
		            		let nstate = word[j];

		                	if(!(nstate in pd[cstate])) {
		                    	pd[cstate][nstate] = 0;
		                	}

		                	pd[cstate][nstate] += 1;
		            	} 			
		            }
		        }
	        }
	    }
	    
	    // Normalize pd
	    for(let cstate in pd) {
	        let ctotal = 0;
	        for(let nstate in pd[cstate]) {
	            ctotal += pd[cstate][nstate];
	        }

	        for(let nstate in pd[cstate]) {
	            pd[cstate][nstate] /= ctotal;
	        }
	    }
	    //console.log(pd);
	    return pd;

	}

	sample(pd, istate){
		let r = random();
	    let probSoFar = 0;

	    for(let nstate in pd[istate]) {
	        probSoFar += pd[istate][nstate];

	        if(r < probSoFar) {
	            return nstate;
	        }
	    }

	}
}