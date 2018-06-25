var pop_size = 30;
var paddles_sketch = [];
var prevPaddles = [];
var ball;
var flag = 0;
var count = 1;
function setup(){
      createCanvas(600,400);
      for (var i =pop_size-1;i>=0;i--) {
        paddles_sketch[i] = new Paddle();
      }
      ball = new Ball(paddles_sketch,pop_size);
}
function draw(){
      // console.log(paddles_sketch)
      background(150);
      if(paddles_sketch.length == 0 ){
          var values;
          values = newGeneration(prevPaddles, pop_size);
          paddles_sketch = values[0];
          ball = new Ball(paddles_sketch, pop_size);
          prevPaddles=[];
      }
      else{
        for (var i =paddles_sketch.length-1 ;i>=0; i--) {
            if(ball.belowPaddle(paddles_sketch[i])){
              prevPaddles.push(paddles_sketch.splice(i,1)[0]);
            }
            else{
              tf.tidy(() => {
              paddles_sketch[i].think(ball);
            });
              paddles_sketch[i].update();
            }
        }
        for (var i in paddles_sketch) {
          if(ball.hit_flag == 1 && paddles_sketch.fitness+paddles_sketch.score < 1)
          {
            console.log('occured');
            prevPaddles.push(paddles_sketch.splice(i,1)[0]);
          }
        }


        ball.update();
        ball.show();
        if(paddles_sketch.length > 0)
        {
          for (var i in paddles_sketch) {
            paddles_sketch[i].show();
          }
        }

      }

}
