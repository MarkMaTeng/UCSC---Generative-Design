class Turtle {
  constructor(s, l, t) {
    this.todo = s;
    this.len = l; 
    this.theta = t;
  } 

  render() {
    stroke(0, 175);
    for (var i = 0; i < todo.length(); i++) {
      var c = todo.charAt(i);
      if (c == 'F' || c == 'G') {
        line(0, 0, this.len, 0);
        translate(this.len, 0);
      } else if (c == '+') {
        rotate(theta);
      } else if (c == '-') {
        rotate(-theta);
      } else if (c == '[') {
        pushMatrix();
      } else if (c == ']') {
        popMatrix();
      }
    }
  }

  setLen(l) {
    this.len = l;
  } 

  changeLen(percent) {
    this.len *= percent;
  }

  setToDo(s) {
    this.todo = s;
  }
}