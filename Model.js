
class Model{
    constructor(){
        this.model = tf.sequential();
        this.model.add(tf.layers.dense({units: 3, inputShape: [3]}));
        this.model.add(tf.layers.dense({units: 5 , activation: 'relu'}));
        this.model.add(tf.layers.dense({units: 1}));
        this.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    }
}
