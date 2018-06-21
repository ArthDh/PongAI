var pop_size = 20;
var paddles = [];
var prevPaddles = [];
var ball;
function setup(){
      createCanvas(600,400);
      for (var i =pop_size;i>=0;i--) {
        paddles[i] = new Paddle();
      }
      ball = new Ball(paddles,pop_size);
}
function draw(){
      background(150);
      if(paddles.length ==0){
          paddles = newGeneration(prevPaddles, pop_size);
          console.log("New gen");
      }

      for (var i = pop_size;i>=0;i--) {
        if(paddles.length>0)
        {
          if(ball.belowPaddle(paddles[i])){
            prevPaddles.push(paddles.splice(i,1));
          }
          else{
            paddles[i].think(ball);
            paddles[i].update();
          }
        }
      }
      ball.update();


      ball.show();
      if(paddles.length > 0)
      {
        for (var i = pop_size;i>=0;i--) {
          paddles[i].show();
        }
      }

}
