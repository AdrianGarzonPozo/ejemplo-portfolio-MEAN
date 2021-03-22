var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

//Usamos como middleware connect-multiparty para poder tratar ficheros subidos
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' })   //Defino que los archivos subidos se guarden en uploads

/* 
app.post('/test/:id', (req, res) => {
    console.log(req.query.nombre); //Coge el nombre que se envia por la url
    console.log(req.body.email);    //Coge el email que se envia por el body
    console.log(req.params.id)  //Coge el parametro que pongamos en la url
    res.status(200).send({message:"Hola Mundo"});
}) 
*/
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);

//Guardar un documento
router.post('/save-project', ProjectController.saveProject);

//Recuperar uno o varios documentos
router.get('/project/:id?', ProjectController.getProject);   //? hace que no sea obligatorio poner el id
router.get('/projects', ProjectController.getProjects);

//Editar un documento
router.put('/project/:id', ProjectController.updateProject);

//Borrar un documento
router.delete('/project/:id', ProjectController.removeProject);

//Guardar una imagen en un documento
//multipartMiddleware se va a ejecutar antes que ProjectControlles.uploadImage
router.post('/uploadImage/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);


module.exports = router;