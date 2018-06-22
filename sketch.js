var pop_size = 10;
var paddles = [];
var prevPaddles = [];
var ball;
var flag = 0;

function setup(){
      createCanvas(600,400);
      for (var i =pop_size;i>=0;i--) {
        paddles[i] = new Paddle();
      }
      ball = new Ball(paddles,pop_size);
}
function draw(){
      background(150);
      if(paddles.length ===0 && flag ===0){
          var values;
          values = newGeneration(prevPaddles, pop_size);
          paddles = values[0];
          // console.log(values[1]);
          prevPaddles=[];
          flag = 1;
          // console.log(paddles);
      }
      else{
        for (var i = pop_size;i>=0;i--) {
          if(paddles.length>0)
          {
            if(ball.belowPaddle(paddles[i])){
              prevPaddles.push(paddles[i]);
              paddles.splice(i,1);
              if (paddles.length ===0){flag =0;}
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

}
