class LSystem {
    constructor(rulesa, proa, rulesb, prob, rulesc, proc) {
        this.x = 330;
        this.y = 480;
        this.s = 5;
        this.angle = radians(90);
        this.rulesa = rulesa;
        this.rulesb = rulesb;
        this.rulesc = rulesc;
        this.proa = proa;
        this.prob = prob;
        this.proc = proc;
        this.stack = [];
    }

    expand(axiom, n) {
        let s = axiom;
        // Generations 
        for(let i = 0; i < n; i++) {
            //console.log("Generation " + i)

            let ns = "";
            if(random(0, 1) < this.proa){
                for(let j = 0; j < s.length; j++) {
                    // If the characte has a rule in the rules, it is
                    // a nonterminal.
                    if(s[j] in this.rulesa) {
                        ns += this.rulesa[s[j]];
                    }
                    else {
                        ns += s[j];
                    }
                }
            }
            if(random(0, 1) < this.prob){
                for(let j = 0; j < s.length; j++) {
                    // If the characte has a rule in the rules, it is
                    // a nonterminal.
                    if(s[j] in this.rulesb) {
                        ns += this.rulesb[s[j]];
                    }
                    else {
                        ns += s[j];
                    }
                }
            }

            if(random(0, 1) < this.proc){
                for(let j = 0; j < s.length; j++) {
                    // If the characte has a rule in the rules, it is
                    // a nonterminal.
                    if(s[j] in this.rulesb) {
                        ns += this.rulesb[s[j]];
                    }
                    else {
                        ns += s[j];
                    }
                }
            }
            //console.log(ns);
            s = ns;
        }
        return s;
    }

    drawString(s, theta) {
        noFill();
        beginShape();

        vertex(this.x, this.y);

        for(let i = 0; i < s.length; i++) {
            switch (s[i]) {
                case "+":
                    this.angle += radians(theta);
                    break;
                case "-":
                    this.angle -= radians(theta);
                    break;
                case "[":
                    this.stack.push([this.x, this.y]);
                    break;
                case "]":
                    endShape();
                    beginShape();
                    let ppos = this.stack.pop();
                    this.x = ppos[0];
                    this.y = ppos[1];
                    vertex(this.x, this.y);
                    break;
                case "F":
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                    vertex(this.x, this.y);
                    break;
                case "G":
                    endShape();
                    beginShape();
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                    vertex(this.x, this.y);
                    break;

                default:
                    console.log("Command doesn't exist");
            }
        }

        endShape();
    }
}
