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
    this.url=global.url;
  }

  testService(){
    return 'Probando servicio de angular';
  }

}
