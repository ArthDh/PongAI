// var pop_size = 0;
function newGeneration(prevPaddles, pop_size){
    var paddles= [];
    var maxfit = evaluate(prevPaddles,pop_size);
    norm(prevPaddles, maxfit, pop_size);
    paddles = selection(prevPaddles, pop_size);
    return [paddles,maxfit];
}

function crossover(paddleA, paddleB, m_rate){
        var weightsA = paddleA.controller.model.getWeights();
        var weightsB = paddleB.controller.model.getWeights();

        var arr1 =[];
        var arr2 =[];
        var child_weights = [];
        for (var temp in weightsA){
            arr1[temp] = weightsA[temp].dataSync();
            arr2[temp] = weightsB[temp].dataSync();
            var mid = floor(arr1[temp].length /2);
            if(random(1)<m_rate){
                child_weights[temp] = arr2[temp];

            }else{
                child_weights[temp] = arr1[temp];
            }
        }
        return child_weights;
}

function evaluate(prevPaddles,pop_size){
    var maxfit =0;
    // print(prevPaddles);
    for(var i =pop_size ; i>= 0; i--){
        var fit = prevPaddles[i].fitness;
        if(fit>maxfit)
        {
            maxfit =fit;
        }
    }
    for (var i =pop_size ; i>= 0; i--) {
        prevPaddles[i].fitness = prevPaddles[i].fitness / maxfit;
    }
    return(maxfit);
}

// Mut rate
function selection(paddles, pop_size){
    var new_paddles =[];

    // for (var i = pop_size ; i>= 0; i--) {
    //     console.log(paddles[i].fitness);
    // }
    for (var i =pop_size;i>=0;i--)
    {
        var parentA = random(paddles);
        var parentB = random(paddles);
        while(true){
            if(random(1)<parentA.fitness && random(1)< parentB.fitness){
                var child_genes = crossover(parentA,parentB,0.5);
                var paddle  = new Paddle(child_genes);
                new_paddles.push(paddle);
                break;
            }else{
              parentA = random(this.blobs_pop);
              parentB = random(this.blobs_pop);
            }
        }

    }

    return new_paddles;
}
