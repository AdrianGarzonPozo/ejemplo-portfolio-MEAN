
var ProjectModel = require('../models/project');
var fs = require('fs')    //Libreria para leer archivos (asi puedo borrar una imagen no deseada)
var path=require('path');   //Para cargar rutas fisicas

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function (req, res) {
        res.status(200).send({
            message: 'Soy el metodo test'
        });
    },

    //Si guardo 1 lo guarda bien pero sale un error y no puedo guardar mas
    saveProject: (req, res) => {

        //Creamos el modelo project donde guardaremos todas sus propiedades
        var project = new ProjectModel();

        //Le llegaran las prpiedades por el body, NO por la url
        var params = req.body;

        //Guardamos cada propiedad donde corresponde
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        //save devuleve un error o el objeto, si devuelve el objeto correctamente lo guarda
        project.save((err, projectStored) => {
            //Si a ocurrido algun error
            if (err) return res.status(500).send({ message: 'Error al guardar' });

            //Si no se ha creado el documento Final
            if (!projectStored) res.status(404).send({ message: 'No se ha podido guardar el proyecto' });

            //Si todo ha salido correcto
            return res.status(200).send({ project: projectStored });
        });
    },

    getProject: (req, res) => {

        //Recogemos de la url el parametro que se llama id
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({ message: 'No has puesto ningun id' });

        //findById devuelve o un error o el objeto con el id que le hemos pasado
        ProjectModel.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!project) return res.status(404).send({ message: 'El documento no existe' });//Por ejemplo si pasa un id que no existe

            return res.status(200).send(project);
        });
    },

    getProjects: (req, res) => {

        ProjectModel.find({}).sort('-year').exec((err, projects) => {   //-year para que vaya de mayor a menor, de menor a menor quitar el -

            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!projects) return res.status(404).send({ message: 'El documento no existe' });

            return res.status(200).send({ projects });

        })
    },

    updateProject: (req, res) => {

        var projectId = req.params.id;

        var update = req.body;

        ProjectModel.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdate) => { //new true para que projectUpdate devuelva los datos actualizados

            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!projectUpdate) return res.status(404).send({ message: 'El documento no existe' });

            return res.status(200).send({ projectUpdate });

        });

    },

    removeProject: (req, res) => {

        var projectId = req.params.id;

        ProjectModel.findByIdAndRemove(projectId, (err, projectRemove) => {

            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!projectRemove) return res.status(404).send({ message: 'El documento no existe' });

            return res.status(200).send({
                proyecto_eliminado: projectRemove
            });
        });

    },

    uploadImage: (req, res) => {

        var projectId = req.params.id;
        var fileName = 'Imagen no subida . . .';

        if (req.files) {

            console.log(req.files);

            var filePath = req.files.image.path; //Ruta donde se ha subido la imagen
            var fileSplit = filePath.split('\\');
            fileName = fileSplit[1];    //Nombre de la imagen

            var extSplit = fileName.split('.');
            var fileExt = extSplit[1]; //Extension de la imagen
            var exts = ['png', 'jpg', 'jpeg', 'gif'];

            if (exts.includes(fileExt)) {    //Comprobamos que queremos una extension correcta

                ProjectModel.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdate) => {
                    if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

                    if (!projectUpdate) return res.status(404).send({ message: 'El documento no existe' });

                    return res.status(200).send({
                        imagen_subida: projectUpdate
                    });
                });

            } else {

                fs.unlink(filePath, (err) => {    //Borra la ruta, en este caso la imagen
                    return res.status(200).send({ message: 'La extension no valida' });
                })

            }


        } else {
            return res.status(404).send({
                message: fileName
            });
        }

    },

    getImageFile:(req,res)=>{
        var file=req.params.image; //nombre del archivo que pasamos por la url
        var path_file='./uploads/'+file;

        fs.exists(path_file, (exists)=>{ //Compruebo si existe la imagen
            if(exists){
                return res.sendFile(path.resolve(path_file));   //Si existe se la mando al front
            }else{
                return res.status(200).send({
                    message:'No existe la imagen'
                });
            }
        });
    }

}

module.exports = controller;