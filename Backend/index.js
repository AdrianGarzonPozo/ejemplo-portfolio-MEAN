var mongoose = require('mongoose');
var app = require('./app'); //Importamos app para usar express
var port = 3700;

//Conexión a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@localhost:27017/portafolio?authSource=admin')
    //Promesa
    .then(() => {
        console.log("Conexión a la bbdd establecida con exito . . .");

        //Crear Servidor con Express
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:3700');
        })


    })
    .catch(err => console.log(err));

