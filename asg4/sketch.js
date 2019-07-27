let world;
let race;
let camera;
let ga;

function setup() {
  createCanvas(640, 400, WEBGL);
  setAttributes('antialias', true);

  // Initialize box2d physics and create the world
  world = createWorld();
  camera = createCamera();

  // Create Camera
  camera.ortho(-width / 2, width / 2, -height / 2, height /2, 0, 10);
  camera.setPosition(0, 0, 0);

  // Create a list of cars
  let cars = []
  for(let i = 0; i < 10; i++) {
      let feats = Car.randomFeatures();
      let pos = createVector(0, -100);
      let car = new Car(pos.x, pos.y, "car" + i, feats);
      cars.push(car);
  }
  //ga = new GeneticAlgorithm(10, 20, fitness, 0.05);

  // Create a terrain
  let pos = createVector(-width/2, 10);
  terrain = new Terrain(pos.x, pos.y, 100, 100, 1);

  // Create a world to manage the cars
  race = new Race(terrain, cars, raceOverCallback);
  race.start();
  ga = new GeneticAlgorithm(10, 20, fitness, 0.05);
}

function draw() {
    if (race.running) {
        background(240);
    }

    race.update();
    race.draw();


    if(race.running) {
        // Update physics. 2nd and 3rd arguments are velocity and position iterations
        let timeStep = 1.0 / 30;
        world.Step(timeStep, 10, 10);

        // Get race leaderboards
        let leaderboard = race.getLeaderboards();

        // Follow first car with the camera
        let firstCar = leaderboard[0].car;

        if (firstCar) {
            let firstPos = firstCar.getPosition();
            camera.setPosition(firstPos.x + width/5, firstPos.y, camera.eyeZ);
        }
    }
}

// ========================================
// Callback function for when the race is over
// ========================================
function raceOverCallback(finalLeaderboards) {
    console.log("race over!");
    console.log(finalLeaderboards);

    // Restart race with new cars
    let cars = []
    ga.evolve();
    for(let i = 0; i < 10; i++) {
        cars.push(ga.population[i].gens);
    }
    race.setCars(cars);
    race.start();
}


function fitness(cars){

  return race.getCarProgress(cars);
}
