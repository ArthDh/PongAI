class Ball{
      constructor(paddles, pop_size){
            this.r = 20;
            this.pos = createVector(width/2, height/2);
            this.vel = createVector(random(-5,5),-5);
            this.acc = createVector();
            this.maxspeed = 4;
            this.score = 0;
            this.paddles = paddles;
            this.pop_size= pop_size;
      }
      applyForce(force){
        this.acc.add(force);
      }
      update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        // this.vel.mult(0.95); //Resistance?
        if(this.pos.x<0|| this.pos.x>width-this.r/2){
          this.vel.x = this.vel.x*-1;
        }
        if(this.pos.y-this.r/2<0){
          this.vel.y = this.vel.y*-1;
        }
        if(this.pos.y>height-this.r/2){
            this.pos = createVector(width/2, height/2);
            this.vel = createVector(0,-5);
            this.applyForce(-0.5);
            // console.log("HIT");
            this.score= this.score+1;

        }

        var flag=0;
        if(paddles.length > 0)
        {
          for(var i =0; i< this.pop_size; i++){
            var paddle = paddles[i];
            if(this.hitPaddle(paddle)){
              paddle.fitness +=1;
            }
            if(this.hitPaddle(paddle) && flag===0){
              flag = 1;
              paddle.color = color(255,0,0);
              var angle = atan2((paddle.pos.x)-this.pos.x, paddle.pos.y-this.pos.y);
              if(cos(angle)>0){
                this.vel.x = this.vel.x + this.vel.x*cos(angle);
                this.vel.y = this.vel.y *-1;
              }
              else{
                this.vel.y = -this.vel.y ;
              }
              // this.applyForce(-0.5);
            }
          }

        }

        this.vel.limit(this.maxspeed);
      }

      hitPaddle(paddle){
          if(this.pos.x>paddle.pos.x && this.pos.x<paddle.pos.x+paddle.w && this.pos.y>paddle.pos.y-this.r/2 && this.pos.y< paddle.pos.y + paddle.h){
            paddle.fitness +=1;
            return true;
        }
        return false;
      }
      belowPaddle(paddle){
          // console.log(paddle);
          if(this.pos.y>paddle.pos.y+paddle.h){
            return true;
        }
        return false;
      }

      show(){
            noStroke();
            fill(255,0,0,100);
            ellipse(this.pos.x,this.pos.y,this.r,this.r);
      }
}
