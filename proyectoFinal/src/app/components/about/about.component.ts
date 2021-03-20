import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  title:string;
  subTitle:string;
  email:string;

  constructor() { 
    this.title="Adrián Garzón";
    this.subTitle="Desarrollador Web";
    this.email="adriangarzonpozo@gmail.com";
  }

  ngOnInit() {
  }

}
