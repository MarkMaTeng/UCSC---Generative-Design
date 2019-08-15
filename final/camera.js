let playerWidth = 1;
let preMouseX;
let preMouseY;
let roX = 0;
let roY = 0;
let mouseSensitivity = 0.004;
let playerX = 0;
let playerZ;
let playerY = -150;
let radius = 1;
let up, left, down, right, lookLeft, lookRight;
let lookBehind = 0;
let normalSpeed = 2;
let runningSpeed = 5;
let running = false;
let ch;

class fpcamera{
  constructor(){

    playerZ = 50;
    preMouseX = mouseX;
    preMouseY = mouseY;
    this.ch = new character(playerX, playerY, playerZ);

  }

  draw() {

    let speed = normalSpeed;
    if (running) speed = runningSpeed;

    //turn camera
    //if (mouseIsPressed) {
      let difMouseX = preMouseX - mouseX;
      let difMouseY = preMouseY - mouseY;
      //console.log("difMouseX:", difMouseX, "difMouseY:", difMouseY);
      if(mouseX < 50 ){
       difMouseX +=  15;
      }
      if( mouseX > 650){
       difMouseX -=  15;
      }
      roX += -difMouseY * mouseSensitivity;
      roY += -difMouseX * mouseSensitivity;
      
      if (roX > 0)
        roX = 0;
      if (roX < - PI - PI)
        roX = - PI - PI;
      if (roY < 0) {
        roY = PI + PI + roY;
      }
      if (roY > PI + PI) {
        roY = roY - PI - PI;
      }
      //console.log("roX:", roX, "roY:", roY);
    //}
    preMouseX = mouseX;
    preMouseY = mouseY;
    if (lookRight) roY += 0.04;
    if (lookLeft) roY -= 0.04;
    let placeToMoveZ = 0;
    let placeToMoveX = 0;
    //move player
    if (left) placeToMoveZ += 1;
    if (right) placeToMoveZ += -1;
    if (up) placeToMoveX += 1;
    if (down) placeToMoveX += -1;
    if (placeToMoveX != 0) {
      let xMove = radius * placeToMoveX * cos(roY) * speed;
      let zMove = radius * placeToMoveX * sin(roY) * speed;
      //let yMove = radius * 10 * cos(roX) * speed;
      playerX = playerX + xMove;
      playerZ = playerZ + zMove;
      //playerY = playerY + yMove;
    }
    if (placeToMoveZ != 0) {
      let xMove = radius * placeToMoveZ * cos(roY - HALF_PI) * speed;
      let zMove = radius * placeToMoveZ * sin(roY - HALF_PI) * speed;
      playerX = playerX + xMove;
      playerZ = playerZ + zMove;
      //console.log("xMove:", xMove, "playerX:", playerX);
    }
    //rotate camera
    let px = playerX + radius * cos(roY - PI * lookBehind);
    let py = playerY + radius * cos(roX);
    let pz = playerZ + radius * sin(roY - PI * lookBehind);
    //move camera
    //camera(1.5+ playerX, 0, 150+playerZ, 1.5+px, 0, 150+pz, 0, 1, 0);
    camera(playerX, playerY, playerZ, px, py, pz, 0, 1, 0);
    //camera(1.5, 0, 150, 1.5, 0, 150, 0, 1, 0);
    //console.log("px:", px, "playerX:", playerX);
    push();
    //console.log("playerX:", playerX, "playerY", playerY, "playerZ", playerZ);
    translate(playerX, playerY, playerZ);
    sphere(10);
    this.ch.setCordinate(playerX, playerY, playerZ);
    //console.log("sphere:",  sphere(20));
    pop();
  }
}


function keyPressed() {
  if (key == 'a' || keyCode == LEFT_ARROW) left = true;
  if (key == 'd' || keyCode == RIGHT_ARROW) right = true;
  if (key == 'w' || keyCode == UP_ARROW) up = true;
  if (key == 's' || keyCode == DOWN_ARROW) down = true;
  if (keyCode == 32) {
    running = true;
  }
  if (key == 'q') playerY -= 30;
  if (key == 'e') playerY += 30;
  if (keyCode == 82){
      for(let i = 0; i < 6; i++){
        
         if (world.switch[i].x - fpc.ch.x < 30 && world.switch[i].x - fpc.ch.x > -30){
          if(world.switch[i].z - fpc.ch.z < 30 && world.switch[i].z - fpc.ch.z > -30){
            time = world.switch[i].turnoff();
          }
         }
      }
      
    }
}

function keyReleased() {
  if (key == 'a' || keyCode == LEFT_ARROW) left = false;
  if (key == 'd' || keyCode == RIGHT_ARROW) right = false;
  if (key == 'w' || keyCode == UP_ARROW) up = false;
  if (key == 's' || keyCode == DOWN_ARROW) down = false;
  if (keyCode == 32) running = false;
  if (keyCode == RIGHT_ARROW) lookRight = false;
  if (keyCode == LEFT_ARROW) lookLeft = false;
}