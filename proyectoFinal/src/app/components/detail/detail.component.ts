import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../services/project.service';
import { Project } from 'src/app/models/Project';
import { global } from './../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

  url: string;
  project:Project;

  constructor(
    private _projectService: ProjectService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.url = global.url;
    this.project=new Project('', '', '', '', 0, '', '');
  }

  ngOnInit() {
    this._route.params.subscribe(params=>{
      console.log(params);
      let id=params.id;

      this.getProject(id);
    })
  }

  getProject(id:number){
    this._projectService.getProject(id).subscribe(
      response=>{
        this.project=response;
      },
      err=>{
        console.log(err);
      }
    )

  }

}
