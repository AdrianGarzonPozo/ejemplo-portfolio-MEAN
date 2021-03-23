import { Project } from './../models/Project';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  testService() {
    return 'Probando servicio de angular';
  }

  saveProject(project: Project): Observable<any> {
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.post(this.url + '/save-project', params, { headers: headers });
  }

  getProjects(): Observable<any> {
    let headers=new HttpHeaders().set('Content-type','application/json');


    return this._http.get(this.url+'/projects', {headers: headers});
  }

  getProject(id:number): Observable<any>{
    let headers=new HttpHeaders().set('Content-type','application/json');
    
    return this._http.get(this.url+'/project/'+id, {headers: headers});
  }

  deleteProject(id:number):Observable<any>{
    let headers=new HttpHeaders().set('Content-type','application/json');
    return this._http.delete(this.url+'/project/'+id, {headers: headers});
  }

}
