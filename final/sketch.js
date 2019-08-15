let cameraLocation;
let sketchLocation;
var p = [];
var n = 20;
let pg;
let time = 0;
let bgm;
function preload() {
  // preload() runs once
  bgm = loadSound('assets/bgm.mp3');
}

function setup() {
  	//Create the Canvas
  	createCanvas(700, 700, WEBGL);

  	
  	//cameraLocation = createVector(0, 0, (height/2.0) / tan(PI*30.0 / 180.0));
  	sketchLocation = createVector(0, 0, 0);

  	// Initial World Generator
	world = new WorldGenerator(32, 32, 32);
	fpc = new fpcamera();
	// Use seed to initial same world terrain
	//world.seed(3);

    //frameRate(30);
    background(0);
    frameRate(60);
    //blendMode(ADD);
    //gl.blendColor(0, 0.5, 1, 1);
    pg = createGraphics(1000, 1000);
    pg.background(0);
    pg.blendMode(ADD);
    pg.stroke('rgba(50,110,200,0.25)');
    for (var i = 0; i < n; i++) {
        p[i] = new Star(350, 350);
    };
    //bgm.play();
}

function draw() {
	//Make the background black
	background(0);

	
	// Camera and Light
	rotateX(PI/2);
	//rotateY(1);
	//rotateZ(1);
	ambientLight(255, 255, 255);
	//ambientMaterial(255, 255, 255);
	//ambientLight(200, 200, 200);
	directionalLight(255, 255, 255, 350, 350);
	//pointLight(255, 255, 255, mouseX, mouseY);
	//normalMaterial();
	//pg.stroke('rgba(50,110,200,0.25)');
	for (var i = 0; i < n; i++) {
		p[i].addTime(time);
        p[i].move();
        p[i].draw(pg);
    };
    translate(0, 0, 500);
    texture(pg);
    plane(1000);
    translate(0, 0, -500);
	// Instantiatte World
	noStroke();
	world.instantiateWorld();
	//translate(0, 700, 0);
	//updateCameraLocation();
	fpc.draw();
	//camera(cameraLocation.x, cameraLocation.y, cameraLocation.z, sketchLocation.x, sketchLocation.y, sketchLocation.z, 0, 1, 0);

	if(time > 0){
		time -= 1;
		if(!bgm.isPlaying()){
			bgm.play();
		}
	}

	
	//console.log("s:", world.switch[0].x, "ch:",  fpc.ch.x);



}
