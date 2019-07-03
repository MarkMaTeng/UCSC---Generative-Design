class ParticleSystem {
	constructor(){
		//this.location = vector.get();
		this.particles = [];

	}

	addParticle() {
		append(this.particles, new Particle(new PVector(random(0, 640),random(0, 180))));
	}

	addNParticle(N) {
		for(var i = 0; N > i; i++){
			append(this.particles, new Particle(new PVector(random(0, 640),random(0, 100))));
		}
	}

	run() {
		this.particles.forEach(this.running);
	}

	running(value, index, array) {
		value.run();
		if (array[index].isDead()) {
  			print('Particle dead!');
  			value.alive = false;
  			value.respawn();
  		}
	}
}
