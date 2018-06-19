// var xs,ys,model;
// function setup() {
//       model = tf.sequential();
//       model.add(tf.layers.dense({units: 1, inputShape: [1]}));
//       model.add(tf.layers.dense({units: 5 , activation: 'relu'}));
//       model.add(tf.layers.dense({units: 1}));

//       model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

//       xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
//       ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// }

// function draw() {
//       createP(model.fit(xs, ys, {epochs: 10}).then(() => {
//         model.predict(tf.tensor2d([5], [1, 1])).print();
//       }));
//       noLoop();
// }
var temp;
var ball;
function setup(){
      createCanvas(600,400);
      temp = new Paddle();
      ball = new Ball();
}
function draw(){
      background(150);
      temp.update();
      ball.update();

      ball.show();
      temp.show();

}
function keyPressed(){
      temp.keyPressed();
}
class Ball{
      constructor(){
            this.r = 20;
            this.pos = createVector(width/2, height/2);
            this.vel = createVector(0,-1);
            this.acc = createVector();
      }
      applyForce(force){
        this.acc.add(force);
      }
      update(){
        this.applyForce(random(-1,1));
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        // this.vel.mult(0.95); //Resistance?
        if(this.pos.x<0|| this.pos.x>width-this.r|| this.pos.y-this.r/2<0|| this.pos.y>height-this.r/2){
            this.vel = this.vel.mult(-1);
        }
      }
      show(){
            noStroke();
            fill(255,0,0,100);
            ellipse(this.pos.x,this.pos.y,this.r,this.r);
      }
}
class Paddle{
      constructor(){
            this.h = 10;
            this.w = 100;
            this.pos = createVector(width/2-this.w/2, height-30);
            this.vel = createVector(0,0);
            this.acc = createVector();
      }
      applyForce(force){
        this.acc.add(force);
      }
      update(){
        // this.applyForce(0.5);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.mult(0.95); //Resistance?
        if(this.pos.x<0){
            this.vel = this.vel.mult(-1);
        }
        if(this.pos.x>width-this.w){
            this.vel = this.vel.mult(-1);
        }
      }
      show(){
            noStroke();
            fill(150,0,220,100);
            rect(this.pos.x,this.pos.y,this.w,this.h)
      }
      keyPressed(){
            if (keyCode === LEFT_ARROW) {
                this.applyForce(-5);
            } else if (keyCode === RIGHT_ARROW) {
                this.applyForce(5);
            }
      }
}
