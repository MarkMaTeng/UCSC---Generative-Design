let cameraLocation;
let sketchLocation;

function setup() {
  	//Create the Canvas
  	createCanvas(700, 700,WEBGL);

  	cameraLocation = createVector(0, 0, (height/2.0) / tan(PI*30.0 / 180.0));
  	sketchLocation = createVector(0, 0, 0);

  	// Initial World Generator
	world = new WorldGenerator(32, 32, 32);

	// Use seed to initial same world terrain
	//world.seed(3);
}

function draw() {
	//Make the background black
	background(0);
	

	// Camera and Light
	rotateX(1);
	//rotateY(1);
	rotateZ(1);
	ambientLight(255, 255, 255);
	//ambientMaterial(255, 255, 255);
	//ambientLight(200, 200, 200);
	directionalLight(255, 255, 255, 350, 350);
	//pointLight(255, 255, 255, mouseX, mouseY);
	normalMaterial();

	// Instantiatte World
	world.instantiateWorld();
	
	updateCameraLocation();
	camera(cameraLocation.x, cameraLocation.y, cameraLocation.z, sketchLocation.x, sketchLocation.y, sketchLocation.z, 0, 1, 0);
	
}

function updateCameraLocation() {
  if (keyIsDown(LEFT_ARROW)) sketchLocation.x -= 50;
  if (keyIsDown(RIGHT_ARROW)) sketchLocation.x += 50;
  if (keyIsDown(UP_ARROW)) cameraLocation.z -= 50;
  if (keyIsDown(DOWN_ARROW)) cameraLocation.z += 50;
  if (mouseIsPressed){
    let camY = map(mouseY, 0, width, -200, 200);
    cameraLocation.y -=camY;
  	}
  
}

