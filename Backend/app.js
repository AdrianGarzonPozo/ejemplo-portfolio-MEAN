var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//cargar archivos de rutas
var project_routes = require('./routes/project');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));   //Para activar bodyparser
app.use(bodyParser.json()); //Cualquier tipo de peticion que llegue lo convierte a json


//cors, para cuando hagamos peticiones desde angular no de problemas ya que estara en el proyecto en produccion desde otro dominio
// Configurar cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //En * pondriamos el dominio permitido
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//rutas
//Para todas las rutas que esten en project_routes deberan entrar por /api primero
//Si no lo queremos solo ponemos '/'
app.use('/api', project_routes);


//export
//Exportamos para poder usarlo en el index
module.exports = app;