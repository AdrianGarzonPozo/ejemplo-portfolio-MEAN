import { global } from './../../services/global';
import { UploadService } from './../../services/upload.service';
import { ProjectService } from './../../services/project.service';
import { Project } from './../../models/Project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  title: string;
  project: Project;
  status: string;
  filesToUpload: Array<File> = [];
  extValid: Array<String>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear proyecto";
    this.project = new Project('', '', '', '', 2019, '', '');
    this.status = "";
    this.extValid = ['png', 'jpg', 'jpeg', 'gif'];
  }

  ngOnInit() {
  }

  onSubmit(form: any) {
    console.log(this.project);
    if (this.filesToUpload.length > 0) {
      console.log(this.filesToUpload[0].name.split(".")[1]);
      if (this.extValid.includes(this.filesToUpload[0].name.split(".")[1])) {
        this._projectService.saveProject(this.project).subscribe(
          (response: any) => {
            if (response.project) {

              //Subimos la imagen

              this._uploadService.makeFileRequest(global.url + '/uploadImage/' + response.project._id, [], this.filesToUpload, 'image')
                .then((result: any) => {
                  if (result.message != "La extension no valida") {

                    console.log(result);

                    this.status = "success";
                    form.reset();

                  } else {
                    console.log(result);

                    alert("La imagen no se ha guardado");
                    this.status = "success";
                    form.reset();
                  }
                }).catch((err: any) => {
                  console.log(err);
                  console.log("Mal");
                });

            }
          },
          (error: any) => {
            console.log(error);
            this.status = "failed";
          }
        );
      }else{
        alert("La imagen tiene que ser png - jpg - jpeg - gif");
      }
    } else {
      alert("Selecciona una imagen");
    }
  }

  fileChangeEvent(fileInput: any) {
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
