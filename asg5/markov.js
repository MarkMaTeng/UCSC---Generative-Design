class MarkovChain{
	constructor(){
		let ilegalChars = {" ": 0};
		let pianoRoll = "";
		//let pd1 = this.train();
    	//pianoRoll = generateTrack(pd1);
    	//console.log(pd1);
	}

	generateTrack(pd){
		let first = int(random(30, 60)) + "_" + int(random(1, 4));
		console.log(pd);
		
		let nstate = this.sample(pd, first);
		
    	let text = "";
    	var len = 3000;

    	for(var i = random(1500); i < len; i++) {
    		var dot = nstate.split("_");
        	text += nstate + " ";
        	//console.log(dot[1]);
        	for(var f = 0; f < dot[1]; f++){
    			text += ". ";
    		}
        	nstate = this.sample(pd, nstate);

    	}
    	//console.log(text);
    	return text;
	}

	train(pianoRolls){
		let pd1 = {};
		let pd2 = {};
    	// Load all states
	    for(let pianoRoll of pianoRolls) {
	    	//console.log(pianoRoll);
	    	for(let word of pianoRoll.split(" ")){
	    		if(word != "."){
	    			let c = word.split("_");
		            	if(!(c[0] in pd1)) {
		               	 	// Create a new state for this character
		                	pd1[c[0]] = {};
		                	//console.log(pd1);
		            	}
		            	if(!(c[1] in pd2)) {
		               	 	// Create a new state for this character
		                	pd2[c[1]] = {};
		                	//console.log(pd1);
		            	}
		            
	    		}
	    	}
	    }
	    pd1["."] = {};

	    // Estimate probability distribution
	    for(let pianoRoll of pianoRolls) {
	    	let word = pianoRoll.split(" ");
	    	for(var i = 0; i < word.length; i++){	
	    		if(word[i] != "."){
	    			let c = word[i].split("_");
			    	let cstate = c[0];
			    	// cstate = 64
			    	if(cstate in pd1){
			    		for(var j = i+1; j < word.length; j++){
				    		let f = word[j].split("_");
				    		if(f[0] != "." && f[0] != ""){
					    		let nstate = f[0];
								if(!(nstate in pd1[cstate])) {
							        pd1[cstate][nstate] = 0;
							    }
							    pd1[cstate][nstate] += 1;
							    break;
							}
						}
				  	
			        }
			    
			        cstate = c[1];
			        // cstate = 2
			        if(cstate in pd2){
			    		for(var j = i+1; j < word.length; j++){
				    		let f = word[j].split("_");
				    		if(f[0] != "." && f[0] != ""){
					    		let nstate = f[1];
					    		//console.log(c[1], f[1] );
								if(!(nstate in pd2[cstate])) {
							        pd2[cstate][nstate] = 0;
							    }
							    
							    pd2[cstate][nstate] += 1;
							    break;
							}
							if(f[0] == ""){
								pd2[cstate][2] =  1;
							}

						}
			        }  			
			    }
			    
			}
	    }
	    // Normalize pd1
	    for(let cstate in pd1) {
	        let ctotal = 0;

	        for(let nstate in pd1[cstate]) {
	            ctotal += pd1[cstate][nstate];
	        }

	        for(let nstate in pd1[cstate]) {
	        	 //console.log(pd1[cstate][nstate], ctotal);
	            pd1[cstate][nstate] /= ctotal;
	             //console.log(pd1[cstate][nstate]);
	            //console.log(ctotal, pd1[cstate][nstate]);
	        }
	    }

	    for(let cstate in pd2) {
	        let ctotal = 0;

	        for(let nstate in pd2[cstate]) {
	            ctotal += pd2[cstate][nstate];
	        }

	        for(let nstate in pd2[cstate]) {
	            pd2[cstate][nstate] /= ctotal;
	        }
	    }
	    let pd = [pd1, pd2];
	    
	    return pd;

	}


	sample(pd, istate){
		let r = random();
	    let probSoFar = 0;
	    var s = istate.split("_");
	    var pd1 = pd[0];
	    var pd2 = pd[1];
	    var a = s[0];
	    var b = s[1];

	    for(var nstate in pd1[a]) {
	        probSoFar += pd1[a][nstate];

	        if(r < probSoFar) {
	            var n1 = nstate;
	            break;
	        }
	    }

	    probSoFar = 0;
	    for(var nstate in pd2[b]) {
	        probSoFar += pd2[b][nstate];

	        if(r < probSoFar) {
	            var n2 = nstate;
	            break;
	        }
	    }

	    //console.log(n1 + "_" + n2);
	    return n1 + "_" + n2;

	}
}