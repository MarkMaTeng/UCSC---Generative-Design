let na = 0;

class Individual {
    constructor(indSize) {
        this.indSize = indSize;
        this.gens = new Array(indSize);
        this.fitness = 0;
        this.init();
    }

    init() {
            let feats = Car.randomFeatures();
            //this.feats = feats;
            let pos = createVector(0, -100);
            //this.pos = pos;
            this.gens = new Car(pos.x, pos.y, "apple" + na, feats);
    }

    getfitness(){
        return this.fitness;
    }
}
//Population Size Individual Size
class GeneticAlgorithm {
    constructor(popSize, indSize, fitFunc, mutationRate) {
        this.indSize = indSize;
        this.popSize = popSize;
        this.fitFunc = fitFunc;
        this.mutationRate = mutationRate;

        this.init();
    }
    //Create i population
    init() {
        this.population = new Array(this.popSize);
        for(let i = 0; i < this.popSize; i++) {
            // Initialize individual i randomly
            this.population[i] = new Individual(this.indSize);
            na++;
        }
    }

    evolve() {
        this.evaluate();

        let matingPool = this.select();
        let newPopulation = this.reproduce(matingPool);
        this.mutate(newPopulation);

        this.population = newPopulation;

        this.evaluate();
        return this.best();
    }

    evaluate() {
        for(let i = 0; i < this.popSize; i++) {
            let individual = this.population[i];
            individual.fitness = this.fitFunc(individual.gens);
        }
    }

    select() {
        let matingPool = new Array();

        // Select this.popSize Individual to be the parents
        for(let i = 0; i < this.popSize; i++) {
            let survivor = this.rouletteWheel();
            matingPool.push(survivor);
        }
        return matingPool;
    }
    //*
    rouletteWheel() {
        this.totalFitness = 0;
        for(let i = 0; i < this.popSize; i++){
            this.totalFitness += this.population[i].fitness;
        }
        
        this.sum = 0;
        this.rand = random(1);
        for(let i = 0; i < this.popSize; i++){
            let survivor = this.population[i];
            this.normalizedFitness = survivor.fitness/this.totalFitness;
            this.sum += this.normalizedFitness;
            //console.log(survivor, this.sum, this.rand, this.normalizedFitness, this.totalFitness);
            if(this.sum >= this.rand) {
                return survivor;
            }
        }

    }

    reproduce(matingPool) {
        let newPopulation = new Array(this.popSize);
        
        for(let i = 0; i < this.popSize; i++) {
            na = i;
            let a = int(random(this.popSize));
            let b = int(random(this.popSize));
            newPopulation[i] = this.crossover(matingPool[a], matingPool[b]);
        }

        return newPopulation;
    }
    //*
    crossover(parentA, parentB) {
        this.split = int(random(0, 10));
        this.child = new Individual(this.indSize);
        //console.log(this.split, parentA, parentB, this.child);
        for(let i = 0; i < this.split*2; i+=2){
            this.child.gens.feats[i] = parentA.gens.feats[i];
            this.child.gens.feats[i+1] = parentA.gens.feats[i+1];
        }
        for(let i = this.split*2; i < this.indSize; i+=2){
            this.child.gens.feats[i] = parentB.gens.feats[i];
            this.child.gens.feats[i+1] = parentB.gens.feats[i+1];
        }
        return this.child;
    }
    //*
    mutate(newPopulation) {
        for(let j = 0; j < this.popSize; j++){
            for(let i = 0; i < 16; i += 2) {
                if(this.mutationRate > random(1)){
                newPopulation[j].gens.feats[i] = Car.randomAngle();
                newPopulation[j].gens.feats[i+1] = Car.randomMagnitude();
            }
            }

            for(let i = 16; i < this.indSize; i += 2) {
                if(this.mutationRate > random(1)){
                newPopulation[j].gens.feats[i] = Car.randomVertex();
                newPopulation[j].gens.feats[i+1] = Car.randomRadius();
            }
            }
        }

        return newPopulation;

    }
    //*
    best() {
        let fitarray = new Array(this.popSize);
        let individuala = this.population[0];
        for(let i = 1; i < this.popSize; i++){
            let individualb = this.population[i];
            if(individuala.fitness < individualb.fitness){
                individuala = individualb;
            }
        }
        return individuala;
    }
}
