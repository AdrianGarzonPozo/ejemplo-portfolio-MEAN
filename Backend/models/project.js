var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});


module.exports = mongoose.model('Project', ProjectSchema);  
//Mongoose automaticamente lo pone el minuscula y lo pluraliza el solo 
// porjects -> guarda los documentos en esa colección

