// var pop_size = 0;
function newGeneration(prevPaddles, pop_size){
    // pop_size = pop_size;
    // var paddles= [];
    // var maxfit = evaluate(prevPaddles);
    // norm(prevPaddles, maxfit);
    // paddles = selection(prevPaddles);
    // return paddles;
    console.log("New gen called");
     for (var i=0;i<pop_size;i++)
    {
        var parentA = random(prevPaddles);
        var parentB = random(prevPaddles);
        var child_genes = crossover(parentA, parentB);
        break;
    }
    var temp = [];
    return temp;
}

function crossover(paddleA, paddleB){
        var weightsA = paddleA[0].controller.model.getWeights();
        var weightsB = paddleB[0].controller.model.getWeights();
        console.log(await weightsA[0].as1D().data());
        return [];
}

function evaluate(pop_size){
    var maxfit =0;
    for(var i =pop_size ; i>= 0; i--){
        var fit = paddles[i].fitness;
        if(fit>maxfit)
        {
            maxfit =fit;
        }
    }
    return(maxfit);
}

function norm(paddles, maxfit, pop_size){
    for (var i = 0;i<pop_size;i++) {
        paddles[i].fitness = map(paddles[i].fitness,0, maxfit, 0.0001,1);
    }
}

// Mut rate
function selection(paddles, pop_size){
    var new_pop =[];

    for (var i=0;i<pop_size;i++)
    {
        var parentA = random(paddles);
        var parentB = random(paddles);
        while(true){
            if(random(1)<parentA.fitness && random(1)< parentB.fitness){
                var child_genes = parentA.crossover(parentB);
                // var child = new Blob();
                // child.mutate(m_rate);
                // new_pop.push(child);
                break;
            }else{
              parentA = random(this.blobs_pop);
              parentB = random(this.blobs_pop);
            }
        }

    }
    // console.log(new_pop);
    this.blobs_pop = new_pop;
}
