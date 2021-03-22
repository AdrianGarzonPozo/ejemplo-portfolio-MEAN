import { global } from './../../services/global';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers:[ProjectService]
})
export class ProjectsComponent implements OnInit {

  projects: Project[]=[];
  url:string;

  constructor(
    private _projectService: ProjectService
  ) {
    this.url=global.url;
   }

  ngOnInit() {
    this.getProjects();
  }


  getProjects(){
    this._projectService.getProjects().subscribe(
      response=>{
        console.log(response);
        this.projects=response.projects;
        console.log(this.projects);
      },
      err=>{
        console.log(err);
      }
    )
  }


}
