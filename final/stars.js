class Star{
    constructor(x, y){
        this.time = 0;

        this.x = x;
        this.y = y;

        this.prev_x = x;
        this.prev_y = y;

        this.theta = random() * 2 * PI;
        this.r = 5;
    }

    draw(pg){
        //console.log(this.time);
        if(this.time > 0){
            pg.stroke('rgba(50,110,200,0.25)');
            pg.line(this.prev_x, this.prev_y, this.x, this.y);
        }
    }

    move() {
        this.theta = random() * 2 * PI;
        this.prev_x = this.x;
        this.prev_y = this.y;
        this.x = this.x + cos(this.theta) * this.r;
        this.y = this.y + sin(this.theta) * this.r;
    }

    addTime(tm){
        this.time = tm;
    }

}
