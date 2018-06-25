// var pop_size = 0;
var pool;
function newGeneration(prevPaddles, pop_size){
    var paddles= [];
    var maxfit = evaluate(prevPaddles,pop_size);
    paddles = selection(prevPaddles, pop_size);
    flag =1;
    return [paddles,maxfit];

}

function duplicate(paddleA, m_rate){
        var weightsA = paddleA.controller.model.getWeights();
        // paddles[0].controller.model.layers[1].setWeights(paddles[1].controller.model.layers[1].getWeights());
        var arr1 =[];
        var child_weights = [];
        for (var temp in weightsA){
            arr1[temp] = weightsA[temp].dataSync();
            // ------
            for (var i = arr1[temp].length-1; i >= 0; i--) {
                if(random(1)< m_rate){
                    arr1[temp][i] =random(-1,1);
                }
            }
            //  ------
            var mid = floor(arr1[temp].length /2);

            tf.tidy(() => {
                if(temp ==0){
                child_weights.push(tf.tensor(arr1[temp]).reshape([3,3]));
            }
            else if(temp ==2){
                child_weights.push(tf.tensor(arr1[temp]).reshape([3,5]));
            }
            else if(temp ==4){
                child_weights.push(tf.tensor(arr1[temp]).reshape([5,1]));
            }
            else{
                child_weights.push(tf.tensor(arr1[temp]));
            }
            });


        }
        // console.log(child_weights);
        return child_weights;
}

function evaluate(prevPaddles,pop_size){
    var maxfit =0;
    for(var i in prevPaddles){
        var fit = 2*prevPaddles[i].score+ 1.5*(prevPaddles[i].fitness);
        if(fit>maxfit)
        {
            maxfit =fit;
        }
    }
    for (var i in prevPaddles) {
        prevPaddles[i].score =(2*prevPaddles[i].score+1.5*prevPaddles[i].fitness)/ maxfit;

    }
    return(maxfit);
}

function selection(paddles, pop_size){
    var new_paddles =[];
    pool = [];
    for(var temp in paddles){
        for(var i=0; i<ceil(paddles[temp].score*15);i++)
        {
            pool.push(paddles[temp]);
        }
    }

    for (var i =pop_size-1;i>=0;i--)
    {

        var parentA = random(pool);
        child_genes =[];
        // console.log(parentA);
        var child_genes = duplicate(parentA,0.2);
        var paddle  = new Paddle();
        // console.log(child_genes);
        paddle.setWeights(child_genes,parentA);
        new_paddles.push(paddle);
    }
    // console.log(new_paddles.length);
    return new_paddles;
}
