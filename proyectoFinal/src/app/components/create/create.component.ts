import { ProjectService } from './../../services/project.service';
import { Project } from './../../models/Project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {

  title: string;
  project: Project;

  constructor(
    private _projectService: ProjectService
  ) { 
    this.title= "Crear proyecto";
    this.project=new Project('','','','',2019,'','');
  }

  ngOnInit() {
  }

  onSubmit(form: any){
    console.log(this.project);
  }

}
