let systems = [];
var n = 100;

function preload(){
	soundFormats('mp3');
	bgm = loadSound('assets/bgm.mp3');
}

function setup() {
  cnv = createCanvas(640,360);

  amplitude = new p5.Amplitude();

  bgm.setVolume(0.3);
  bgm.play();
  
  ps = new ParticleSystem();
  ps.addNParticle(n);
}

function draw() {

  background(0);
  ps.run();
  
}


