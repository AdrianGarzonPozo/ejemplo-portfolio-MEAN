import { Injectable } from '@angular/core';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url: string;

  constructor() {
    this.url = global.url;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
    return new Promise((resolve, reject) => {

      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i=0; i<files.length; i++){  //Recorre todos los ficheros que llegan
        //Lo añado al fomulario con el nombre, el archivo y recoge el nombre del archivo
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = () =>{
        if(xhr.readyState==4){
          if(xhr.status==200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', url, true);
      xhr.send(formData);

    });
  }

}
