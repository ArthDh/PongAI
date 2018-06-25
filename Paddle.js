class Paddle{
      constructor(weights){
            this.h = 10;
            this.w = 100;
            this.pos = createVector(width/2-this.w/2, height-30);
            this.vel = createVector(0,0);
            this.acc = createVector();
            this.color = color(150,0,220,100);
            this.controller = new Model();
            this.fitness = 0;
            this.score =0;
            this.prev_pos =createVector(width/2-this.w/2, height-30);
      }


      applyForce(force){
        this.acc.add(force);
      }
      update(){
        // this.fitness +=1;
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.mult(0.95); //Resistance?
        this.pos.x = constrain(this.pos.x,0,width-this.w)
        this.color = color(150,0,220,100);
        this.keyPressed();
      }

      show(){
            noStroke();
            fill(this.color);
            rect(this.pos.x,this.pos.y,this.w,this.h)
      }
      keyPressed(){
          if (keyCode === LEFT_ARROW && keyIsPressed) {
              this.pos.x -=10;
          } else if (keyCode === RIGHT_ARROW && keyIsPressed) {
              this.pos.x +=10;
          }
      }

      updatefitness(ball){
        var d = dist(this.pos.x,this.pos.y, ball.pos.x,ball.pos.y);
        this.fitness = 1/(d+0.5);
      }

      think(ball){
        var inputs = [];
        inputs[0] = this.pos.x/width;
        inputs[1] = ball.pos.x/width;
        inputs[2] = ball.pos.y/height;

        tf.tidy(() => {
        var tf_inputs = tf.tensor2d(inputs,[1,3]);
        let pred = this.controller.model.predict(tf_inputs);
        // console.log();
        if(pred.dataSync()[0] > 0.5){
          this.pos.x +=10;
        }
        else{
          this.pos.x -=10;
        }
        this.updatefitness(ball);
        });


      }

      setWeights(weights,parentA){
        tf.tidy(() => {
        this.controller.model.setWeights(weights);
        });
      }

      idle(){
        if(this.pos.x==this.prev_pos.x){
          return true;
        }
        return false;
      }

}

