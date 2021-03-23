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
  project: Project;
  id:any;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = global.url;
    this.project = new Project('', '', '', '', 0, '', '');
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      console.log(params);
      this.id = params.id;
      console.log(this.id);

      this.getProject(this.id);
    });
  }

  getProject(id: number) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response;
        console.log(this.project);
      },
      err => {
        console.log(err);
      }
    );

  }

  deleteProject(id: number) {
    this._projectService.deleteProject(id).subscribe(
      response => {
          console.log(response);
          this._router.navigate(['/proyectos']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
